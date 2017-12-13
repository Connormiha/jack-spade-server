// @flow

import {
    TOO_MACH_MEMBERS, TOO_FEW_MEMBERS, GAME_PLAYER_ALREADY_EXIST,
    GAME_CURRENT_ROUND_NOT_FINISHED, GAME_IS_FINISHED, GAME_WRONG_ROUND,
} from 'errors';
import Player from 'components/player';
import type {TypePlayerStoreSnapshot, PredictionCount} from 'components/player';
import Round, {
    ROUND_STATUS_FINISHED,
} from 'components/round';
import type {TypeRoundStoreSnapshot} from 'components/round';
import {getRandomCards} from 'utils/collections';
import type {Card} from 'components/card';

export const MAX_MEMBERS = 6;

export const COUNT_ROUNDS = 13;

export const GAME_STATUS_WAITING = 'WAITING';
export const GAME_STATUS_IN_PROGRESS = 'IN_PROGRESS';
export const GAME_STATUS_FINISHED = 'FINISHED';

export type TypeGamePrediction = {|
    playerId: string,
    count: PredictionCount,
    roundId: number,
|};

export type TypeGameCreateStepParam = {|
    playerId: string,
    roundId: number,
    card: Card
|};

type TypeInitParams = {
    id: string
};
type roundNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type gameStatus = 'WAITING' | 'IN_PROGRESS' | 'FINISHED';

export type TypeGameStoreSnapshot = {|
    id: string,
    currentRound: TypeRoundStoreSnapshot | null,
    currentRoundNumber: roundNumber,
    currentOrderFirstPlayer: number,
    mainPlayerId: string,
    players: Array<TypePlayerStoreSnapshot>,
    status: gameStatus
|};

class Game {
    _id: string;
    _mainPlayerId: string;
    _players: Array<Player>;
    _currentRound: Round | null;
    _currentOrderFirstPlayer: number;
    _currentRoundNumber: roundNumber;
    _status: gameStatus;

    constructor(params?: TypeInitParams) {
        if (params) {
            this._create(params);
        }
    }

    _create({id}: TypeInitParams) {
        this._id = id;
        this._players = [];
        this._currentRoundNumber = 1;
        this._currentRound = null;
        this._currentOrderFirstPlayer = 0;
        this._status = GAME_STATUS_WAITING;
    }

    joinPlayer(player: Player): void {
        if (this._hasPlayer(player.id)) {
            throw new Error(GAME_PLAYER_ALREADY_EXIST);
        }

        if (this.countMembers === MAX_MEMBERS) {
            throw new Error(TOO_MACH_MEMBERS);
        }

        this._players.push(player);

        if (this.countMembers === 1) {
            this._mainPlayerId = player.id;
        }
    }

    _hasPlayer(id: string): boolean {
        return this._players.some((item) => item.id === id);
    }

    getSnapshot(): TypeGameStoreSnapshot {
        const currentRound = this._currentRound ? this._currentRound.getSnapshot() : null;

        return {
            currentRound,
            currentRoundNumber: this._currentRoundNumber,
            currentOrderFirstPlayer: this._currentOrderFirstPlayer,
            mainPlayerId: this._mainPlayerId,
            status: this._status,
            id: this._id,
            players: this._players.map((item) => item.getSnapshot()),
        };
    }

    restore(params: TypeGameStoreSnapshot) {
        if (params.currentRound) {
            const currentRound = new Round();

            currentRound.restore(params.currentRound);
            this._currentRound = currentRound;
            this._players = this._currentRound._players;
        } else {
            this._players = params.players.map((item) => new Player().restore(item));
        }

        this._id = params.id;
        this._currentRoundNumber = params.currentRoundNumber;
        this._currentOrderFirstPlayer = params.currentOrderFirstPlayer;
        this._mainPlayerId = params.mainPlayerId;
        this._status = params.status;
    }

    nextRound() {
        if (this._status === GAME_STATUS_FINISHED) {
            throw new Error(GAME_IS_FINISHED);
        }

        if (this._currentRound && this._currentRound.status !== ROUND_STATUS_FINISHED) {
            throw new Error(GAME_CURRENT_ROUND_NOT_FINISHED);
        }

        if (this.countMembers < 2) {
            throw new Error(TOO_FEW_MEMBERS);
        }

        let exceptedCards = [];
        const countCards: number = this.countCards;

        this._players.forEach((player) => {
            const cards = getRandomCards(countCards, exceptedCards);

            exceptedCards = exceptedCards.concat(cards);
            player.fillCards(cards);
        });

        this._currentRound = new Round({
            players: this._players,
            countCards,
            currentOrder: this._currentOrderFirstPlayer,
            trumpCard: getRandomCards(1, countCards === 6 ? [] : exceptedCards)[0],
        });

        this._status = GAME_STATUS_IN_PROGRESS;
    }

    setPrediction(params: TypeGamePrediction) {
        if (!this._currentRound || this._currentRound.id !== params.roundId) {
            throw new Error(GAME_WRONG_ROUND);
        }

        this._currentRound.setPrediction(params.playerId, params.count);
    }

    /**
     * User tryes make action
     */
    createStep({playerId, card, roundId}: TypeGameCreateStepParam) {
        const currentRound = this._currentRound;

        if (!currentRound || currentRound.id !== roundId) {
            throw new Error(GAME_WRONG_ROUND);
        }

        currentRound.createStep({playerId, card});

        if (currentRound.status === ROUND_STATUS_FINISHED) {
            this._calcPoints();
            if (this.__currentRoundNumber === 13) {
                this._status = GAME_STATUS_FINISHED;
            } else {
                this._currentRoundNumber++;
                this._tickCurrentOrderFirstPlayer();
            }
        }
    }

    _calcPoints() {
        const FINE_VALUE = this.__currentRoundNumber === 13 ? 30 : 10;
        const PASS_VALUE = this.__currentRoundNumber === 13 ? 15 : 5;

        this._players.forEach((player: Player) => {
            if (player.roundPrediction === player.roundWinsCount) {
                if (player.roundPrediction) {
                    player.points += player.roundPrediction * FINE_VALUE;
                } else {
                    player.points += PASS_VALUE;
                }
            } else if (player.roundPrediction < player.roundWinsCount) {
                player.points += player.roundPrediction;
            } else {
                player.points -= (player.roundPrediction - player.roundWinsCount) * FINE_VALUE;
            }
        });
    }

    _tickCurrentOrderFirstPlayer() {
        if (this._currentOrderFirstPlayer === this._players.length - 1) {
            this._currentOrderFirstPlayer = 0;
        } else {
            this._currentOrderFirstPlayer++;
        }
    }

    get roundNumber(): roundNumber {
        return this._currentRoundNumber;
    }

    get countCards(): number {
        if (this._currentRoundNumber < 7) {
            return this._currentRoundNumber;
        }

        return (COUNT_ROUNDS - this._currentRoundNumber) || 1;
    }

    get id(): string {
        return this._id;
    }

    get status(): gameStatus {
        return this._status;
    }

    get countMembers(): number {
        return this._players.length;
    }

    get roundId(): number {
        return this._currentRound ? this._currentRound.id : -1;
    }
}

export default Game;
