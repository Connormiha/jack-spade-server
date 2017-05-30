// @flow

import {
    TOO_MACH_MEMBERS, TOO_FEW_MEMBERS, GAME_PLAYER_ALREADY_EXIST,
    GAME_CURRENT_ROUND_NOT_FINISHED, GAME_IS_FINISHED
} from 'errors';
import type Player from 'components/player';
import Round, {
    ROUND_STATUS_FINISHED
} from 'components/round';
import {getRandomCards} from 'utils/collections';

export const MAX_MEMBERS = 6;

export const COUNT_ROUNDS = 13;

export const GAME_STATUS_WAITING = 'WAITING';
export const GAME_STATUS_IN_PROGRESS = 'IN_PROGRESS';
export const GAME_STATUS_FINISHED = 'FINISHED';

type init_params = {
    id: string
};
type roundNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type gameStatus = 'WAITING' | 'IN_PROGRESS' | 'FINISHED';

class Game {
    _id: string;
    _mainPlayerId: string;
    _players: Array<Player>;
    _currentRound: Round;
    _currentRoundNumber: roundNumber;
    _status: gameStatus;

    constructor({id}: init_params) {
        this._id = id;
        this._players = [];
        this._currentRoundNumber = 1;
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

    setRound(round: Round) {
        this._currentRound = round;
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

        const players = this._players.map(({id}) => {
            const cards = getRandomCards(countCards, exceptedCards);

            exceptedCards = exceptedCards.concat(cards);

            return {
                cards,
                id
            };
        });

        this._currentRound = new Round({
            players,
            countCards,
            currentOrder: 0,
            trumpCard: getRandomCards(1, countCards === 6 ? [] : exceptedCards)[0]
        });

        this._status = GAME_STATUS_IN_PROGRESS;
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
}

export default Game;
