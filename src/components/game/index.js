// @flow

import {TOO_MACH_MEMBERS, TOO_FEW_MEMBERS} from 'errors';
import type Player from 'components/player';
import Round from 'components/round';
import {getRandomCards} from 'utils/collections';

export const MAX_MEMBERS = 6;

export const COUNT_ROUNDS = 13;

type init_params = {id: string};
type roundNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

class Game {
    _id: string;
    _mainPlayerId: string;
    _players: Array<Player>;
    _currentRound: Round;
    _currentRoundNumber: roundNumber;

    constructor({id}: init_params) {
        this._id = id;
        this._players = [];
        this._currentRoundNumber = 1;
    }

    join(player: Player): void {
        if (this.countMembers === MAX_MEMBERS) {
            throw new Error(TOO_MACH_MEMBERS);
        }

        this._players.push(player);

        if (this.countMembers === 1) {
            this._mainPlayerId = player.id;
        }
    }

    setRound(round: Round) {
        this._currentRound = round;
    }

    startGame() {
        if (this.countMembers < 2) {
            throw new Error(TOO_FEW_MEMBERS);
        }

        let exceptedCards = [];
        const cardsCount: number = this.cardsCount;

        const players = this._players.map(({id}) => {
            const cards = getRandomCards(cardsCount, exceptedCards);

            exceptedCards = exceptedCards.concat(cards);

            return {
                cards,
                id
            };
        });

        this._currentRound = new Round({
            players,
            cardsCount,
            currentOrder: 0,
            trumpCard: getRandomCards(1, cardsCount === 6 ? [] : exceptedCards)[0]
        });
    }

    get cardsCount(): number {
        if (this._currentRoundNumber < 7) {
            return this._currentRoundNumber;
        }

        return (COUNT_ROUNDS - this._currentRoundNumber) || 1;
    }

    get id(): string {
        return this._id;
    }

    get countMembers(): number {
        return this._players.length;
    }
}

export default Game;
