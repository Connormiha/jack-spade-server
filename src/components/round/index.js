// @flow

import {WRONG_PLAYER_ORDER, ROUND_STEP_CARD_INCORRECT} from 'errors';
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

export type ROUND_STATUS = 'NOT_READY' | 'READY' | 'FINISHED';

class Round {
    _trumpCard: Card;
    _players: Array<RoundPlayerInner>;
    _currentOrder: number;
    _currentStepStore: Array<RoundDropCard>;
    _status: ROUND_STATUS;

    constructor({trumpCard, players, currentOrder}: RoundInitialParams) {
        this._trumpCard = trumpCard;
        this._players = players.map(({id, cards}) => ({
            id, cards, points: 0, prediction: 0
        }));

        this._currentOrder = currentOrder;
        this._currentStepStore = [];
        this._status = 'NOT_READY';
    }

    seеPrediction(playerId: string, count: PredictionCount) {
        const player = this._getPlayerById(playerId);

        player.prediction = count;
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

    _getPlayerById(): RoundPlayerInner {
        return this._players[0];
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
