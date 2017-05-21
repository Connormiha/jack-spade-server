// @flow

import {TOO_MACH_MEMBERS, TOO_FEW_MEMBERS} from 'errors';
import type Player from 'components/player';
import type Round from 'components/round';

export const MAX_MEMBERS = 6;

type init_params = {id: string};

class Game {
    _id: string;
    _mainPlayerId: string;
    _players: Map<string, Player>;
    _currentRound: Round;
    _currentRoundNumber: number;

    constructor({id}: init_params) {
        this._id = id;
        this._players = new Map();
        this._currentRoundNumber = 1;
    }

    join(player: Player): void {
        if (this.countMembers < MAX_MEMBERS) {
            this._players.set(player.id, player);
        } else {
            throw new Error(TOO_MACH_MEMBERS);
        }

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
    }

    get id(): string {
        return this._id;
    }

    get countMembers(): number {
        return this._players.size;
    }
}

export default Game;
