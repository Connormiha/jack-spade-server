// @flow

import {
    WRONG_PLAYER_ORDER, WRONG_PLAYERS_COUNT, ROUND_STEP_CARD_INCORRECT,
    ROUND_ALREADY_STARTED, PLAYER_ALREADY_PLACED_A_BET, PLAYER_NOT_FOUND
} from 'errors';
import {CARD_SPADE_JACK} from 'components/card';
import {getStrongestCard, isCardBigger} from 'utils/collections';

import type {Card} from 'components/card';

export type PredictionCount = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type RoundPlayer = {
    cards: Array<Card>,
    +id: string
};

type RoundPlayerInner = RoundPlayer & {
    points: number,
    prediction: PredictionCount
};

export type RoundInitialParams = {|
    trumpCard: Card,
    players: Array<RoundPlayer>,
    currentOrder: number
|};

export const ROUND_STEP_TYPE_ATTACK = 'attack';
export const ROUND_STEP_TYPE_DEFENSE = 'defense';

export type RoundStepType = 'attack' | 'defense';

type RoundDropCard = {|
    ownerId: string,
    card: Card
|};

type createStepParam = {|
    playerId: string,
    stepType: RoundStepType,
    card: Card
|};

export const ROUND_STATUS_NOT_READY = 'NOT_READY';
export const ROUND_STATUS_READY = 'READY';
export const ROUND_STATUS_FINISHED = 'FINISHED';

export type ROUND_STATUS = 'NOT_READY' | 'READY' | 'FINISHED';

class Round {
    _trumpCard: Card;
    _players: Array<RoundPlayerInner>;
    _currentOrder: number;
    _currentStepStore: Array<RoundDropCard>;
    _status: ROUND_STATUS;

    constructor({trumpCard, players, currentOrder}: RoundInitialParams) {
        if (players.length < 2 || players.length > 6) {
            throw new Error(WRONG_PLAYERS_COUNT);
        }

        this._trumpCard = trumpCard;
        this._players = players.map(({id, cards}) => ({
            id, cards, points: 0, prediction: 0
        }));

        this._currentOrder = currentOrder;
        this._currentStepStore = [];
        this._status = ROUND_STATUS_NOT_READY;
    }

    seеPrediction(playerId: string, count: PredictionCount) {
        if (this._status !== ROUND_STATUS_NOT_READY) {
            throw new Error(ROUND_ALREADY_STARTED);
        }

        const player = this._getPlayerById(playerId);

        if (player.prediction !== 0) {
            throw new Error(PLAYER_ALREADY_PLACED_A_BET);
        }

        player.prediction = count;
        this._validateAllPredictions();
    }

    _validateAllPredictions() {
        for (const player of this._players) {
            if (player.prediction === 0) {
                // Not everyone 'voted'
                return;
            }
        }

        this._status = ROUND_STATUS_READY;
    }

    get status(): ROUND_STATUS {
        return this._status;
    }

    _calcPoints() {
        const strongetsCard: Card = this._currentStepStore[0].card;
        let winnerId: string = this._currentStepStore[0].ownerId;

        for (const roundCard of this._currentStepStore) {
            winnerId = isCardBigger(strongetsCard, roundCard.card, this._trumpCard) ? winnerId : roundCard.ownerId;
        }

        const player = this._getPlayerById(winnerId);

        player.points++;
    }

    _getPlayerById(id: string): RoundPlayerInner {
        for (const player of this._players) {
            if (player.id === id) {
                return player;
            }
        }

        throw new Error(PLAYER_NOT_FOUND);
    }

    _getCurrentPlayer(): RoundPlayerInner {
        return this._players[this._currentOrder];
    }

    _tickOrder() {
        if (this._currentOrder === this._players.length) {
            this._currentOrder = 0;
        } else {
            this._currentOrder++;
        }
    }

    _hasPlayer(id: string): boolean {
        for (const item of this._players) {
            if (item.id === id) {
                return true;
            }
        }

        return false;
    }

    _setFinished() {
        this._status = 'FINISHED';
    }

    _isCorrectStep(playerId: string, card: Card): boolean {
        const headCard = this._currentStepStore[0].card;
        const player = this._getPlayerById(playerId);

        if (player.cards.length === 1) {
            return true;
        }

        if (headCard === CARD_SPADE_JACK) {
            // Should take the strongest trump
            const strongestCard: Card = getStrongestCard(player.cards, headCard);

            if (strongestCard.suit === this._trumpCard.suit) {
                return strongestCard === card;
            } else {
                return true;
            }
        } else {
            if (headCard.suit === card.suit) {
                return true;
            }

            if (card === CARD_SPADE_JACK) {
                return true;
            }

            if (player.cards.every((item) => (item.suit !== headCard.suit || item === CARD_SPADE_JACK))) {
                return true;
            }
        }

        return false;
    }

    createStep({playerId, stepType, card}: createStepParam) {
        const player = this._getCurrentPlayer();

        if (playerId !== player.id) {
            throw new Error(WRONG_PLAYER_ORDER);
        }

        if (stepType === ROUND_STEP_TYPE_DEFENSE || this._isCorrectStep(playerId, card)) {
            this._currentStepStore.push({
                ownerId: playerId,
                card
            });
        } else {
            throw new Error(ROUND_STEP_CARD_INCORRECT);
        }

        // Last player made step
        if (this._currentStepStore.length === this._players.length) {
            this._calcPoints();
            this._currentStepStore = [];
            this._setFinished();
        } else {
            this._tickOrder();
        }
    }
}

export default Round;
