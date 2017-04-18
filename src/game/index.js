// @flow

import {TOO_MACH_MEMBERS} from 'errors';
import type Player from 'player';

export const MAX_MEMBERS = 6;

type init_params = {id: string};

class Game {
    _id: string;
    _mainPlayerId: string;
    _players: Map<string, Player>;

    constructor({id}: init_params) {
        this._id = id;
        this._players = new Map();
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

    get id(): string {
        return this._id;
    }

    get countMembers(): number {
        return this._players.size;
    }
}

export default Game;
