// @flow

import {TOO_MACH_MEMBERS} from 'errors';
import type Player from 'player';

const MAX_MEMBERS = 6;

type id_type = string;
type init_params = {id: id_type};

class Game {
    _id: id_type;
    _players: Map<string, any>;

    constructor({id}: init_params) {
        this._id = id;
        this._players = new Map();
    }

    join(player: Player): void {
        if (this.countMembers < MAX_MEMBERS) {
            this._players.set(player.id, player);
        } else {
            throw new Error({name: TOO_MACH_MEMBERS});
        }
    }

    get id(): id_type {
        return this._id;
    }

    get countMembers(): number {
        return this._players.size;
    }
}

export default Game;
