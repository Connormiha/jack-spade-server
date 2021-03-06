// @flow

import {
    WRONG_PLAYER_ORDER, WRONG_PLAYERS_COUNT, ROUND_STEP_CARD_INCORRECT,
    ROUND_ALREADY_STARTED, PLAYER_ALREADY_PLACED_A_BET, PLAYER_NOT_FOUND,
    ROUND_WRONG_PREDICTION_COUNT, ROUND_WRONG_PLAYER_CARDS_COUNT, ROUND_STEP_WRONG_STATUS,
    ROUND_STEP_CARD_NOT_EXIST, ROUND_WRONG_PREDICTION_ORDER_PLAYER,
} from 'errors';
import {CARD_SPADE_JACK} from 'components/card';
import {getStrongestCard, isCardBigger} from 'utils/collections';
import Player from 'components/player';
import type {TypePlayerStoreSnapshot, PredictionCount} from 'components/player';

import type {Card} from 'components/card';

type RoundDropCard = {|
    playerId: string,
    card: Card
|};

export const ROUND_STATUS_NOT_READY = 'NOT_READY';
export const ROUND_STATUS_READY = 'READY';
export const ROUND_STATUS_FINISHED = 'FINISHED';

export type ROUND_STATUS = 'NOT_READY' | 'READY' | 'FINISHED';

export type TypeRoundStoreSnapshot = {|
    trumpCard: Card;
    players: Array<TypePlayerStoreSnapshot>;
    currentOrder: number;
    currentPredictionOrder: number;
    attackOrder: number;
    currentStepStore: Array<RoundDropCard>;
    status: ROUND_STATUS;
    countCards: number;
    currentStepNumber: number;
    id: number;
|};

export type RoundInitialParams = {|
    trumpCard: Card,
    players: Player[],
    currentOrder: number,
    countCards: number,
|};

type createStepParam = {|
    playerId: string,
    card: Card
|};

let id = 1;

const getSnapshotRoundPlayer = (item: Player): TypePlayerStoreSnapshot =>
    item.getSnapshot();

class Round {
    _trumpCard: Card;
    _players: Player[];
    _currentOrder: number;
    _currentPredictionOrder: number;
    _attackOrder: number;
    _currentStepStore: Array<RoundDropCard>;
    _status: ROUND_STATUS;
    _countCards: number;
    _currentStepNumber: number;
    _id: number;

    constructor(params?: RoundInitialParams) {
        if (params) {
            this._create(params);
        }
    }

    _create({trumpCard, players, currentOrder, countCards}: RoundInitialParams) {
        if (players.length < 2 || players.length > 6) {
            throw new Error(WRONG_PLAYERS_COUNT);
        }

        for (const player of players) {
            if (player.getCountCards() !== countCards) {
                throw new Error(ROUND_WRONG_PLAYER_CARDS_COUNT);
            }

            player.roundPrediction = 0;
            player.isRoundVoted = false;
            player.roundWinsCount = 0;
        }

        this._trumpCard = trumpCard;
        this._players = players;

        this._currentOrder = currentOrder;
        this._currentPredictionOrder = currentOrder;
        this._attackOrder = currentOrder;
        this._currentStepStore = [];
        this._status = ROUND_STATUS_NOT_READY;
        this._countCards = countCards;
        this._currentStepNumber = 1;
        this._id = id;
        id++;
    }

    restore(params: TypeRoundStoreSnapshot) {
        this._trumpCard = params.trumpCard;
        this._players = params.players.map((item: TypePlayerStoreSnapshot): Player =>
            new Player().restore(item)
        );
        this._currentOrder = params.currentOrder;
        this._currentPredictionOrder = params.currentPredictionOrder;
        this._attackOrder = params.attackOrder;
        this._currentStepStore = params.currentStepStore;
        this._status = params.status;
        this._countCards = params.countCards;
        this._currentStepNumber = params.currentStepNumber;
        this._id = params.id;
    }

    getSnapshot(): TypeRoundStoreSnapshot {
        return {
            trumpCard: this._trumpCard,
            players: this._players.map(getSnapshotRoundPlayer),
            currentOrder: this._currentOrder,
            currentPredictionOrder: this._currentPredictionOrder,
            attackOrder: this._attackOrder,
            currentStepStore: this._currentStepStore,
            status: this._status,
            countCards: this._countCards,
            currentStepNumber: this._currentStepNumber,
            id: this._id,
        };
    }

    setPrediction(playerId: string, count: PredictionCount) {
        if (this._status !== ROUND_STATUS_NOT_READY) {
            throw new Error(ROUND_ALREADY_STARTED);
        }

        const player = this._getPlayerById(playerId);

        if (player.isRoundVoted) {
            throw new Error(PLAYER_ALREADY_PLACED_A_BET);
        }

        if (this._players[this._currentPredictionOrder].id !== playerId) {
            throw new Error(ROUND_WRONG_PREDICTION_ORDER_PLAYER);
        }

        if (count < 0 || count > this._countCards) {
            throw new Error(ROUND_WRONG_PREDICTION_COUNT);
        }

        player.roundPrediction = count;
        player.isRoundVoted = true;
        this._tickPredictionOrder();
        this._validateAllPredictions();
    }

    /**
     * Checks votes for all players
     */
    _validateAllPredictions() {
        // Not everyone 'voted'
        if (this._players.every(({isRoundVoted}) => isRoundVoted)) {
            this._status = ROUND_STATUS_READY;
        }
    }

    get id(): number {
        return this._id;
    }

    get status(): ROUND_STATUS {
        return this._status;
    }

    _calcPoints() {
        const strongetsCard: Card = this._currentStepStore[0].card;
        let winnerId: string = this._currentStepStore[0].playerId;

        for (const roundCard of this._currentStepStore) {
            winnerId = isCardBigger(strongetsCard, roundCard.card, this._trumpCard) ? winnerId : roundCard.playerId;
        }

        const player = this._getPlayerById(winnerId);

        player.roundWinsCount++;
        this._currentOrder = this._players.indexOf(player);
        this._attackOrder = this._currentOrder;
    }

    _getPlayerById(id: string): Player {
        for (const player of this._players) {
            if (player.id === id) {
                return player;
            }
        }

        throw new Error(PLAYER_NOT_FOUND);
    }

    _getCurrentPlayer(): Player {
        return this._players[this._currentOrder];
    }

    _tickOrder() {
        if (this._currentOrder === this._players.length - 1) {
            this._currentOrder = 0;
        } else {
            this._currentOrder++;
        }
    }

    _tickPredictionOrder() {
        if (this._currentPredictionOrder === this._players.length - 1) {
            this._currentPredictionOrder = 0;
        } else {
            this._currentPredictionOrder++;
        }
    }

    _setFinished() {
        this._status = ROUND_STATUS_FINISHED;
    }

    _isCorrectStep(playerId: string, card: Card): boolean {
        const headCard = this._currentStepStore[0].card;
        const roundPlayer = this._getPlayerById(playerId);
        const allPlayerCards: Card[] = roundPlayer.getAllCards();

        if (allPlayerCards.length === 1) {
            return true;
        }

        if (headCard === CARD_SPADE_JACK) {
            // Should take the strongest trump
            const strongestCard: Card = getStrongestCard(allPlayerCards, this._trumpCard);

            if (strongestCard.suit === this._trumpCard.suit) {
                return strongestCard === card;
            }

            return true;
        }

        if (headCard.suit === card.suit) {
            return true;
        }

        if (card === CARD_SPADE_JACK) {
            return true;
        }

        if (allPlayerCards.every((item) => (item.suit !== headCard.suit || item === CARD_SPADE_JACK))) {
            return true;
        }

        return false;
    }

    createStep({playerId, card}: createStepParam) {
        if (this._status !== ROUND_STATUS_READY) {
            throw new Error(ROUND_STEP_WRONG_STATUS);
        }

        const roundPlayer = this._getCurrentPlayer();

        if (playerId !== roundPlayer.id) {
            throw new Error(WRONG_PLAYER_ORDER);
        }

        if (!roundPlayer.hasCard(card)) {
            throw new Error(ROUND_STEP_CARD_NOT_EXIST);
        }

        const isAttack = this._attackOrder === this._currentOrder;

        if (isAttack || this._isCorrectStep(playerId, card)) {
            this._currentStepStore.push({
                playerId,
                card,
            });

            roundPlayer.deleteCard(card);
        } else {
            throw new Error(ROUND_STEP_CARD_INCORRECT);
        }

        // Last player made step
        if (this._currentStepStore.length === this._players.length) {
            this._calcPoints();
            this._currentStepStore = [];

            if (this._currentStepNumber === this._countCards) {
                this._setFinished();
            } else {
                this._currentStepNumber++;
            }
        } else {
            this._tickOrder();
        }
    }
}

export default Round;
