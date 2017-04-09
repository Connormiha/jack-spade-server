// @flow

import {TOO_MACH_MEMBERS} from 'errors';
import type Gamer from 'gamer';

const MAX_MEMBERS = 6;

type id_type = number;
type init_params = {id: id_type};

class Game {
    _id: id_type;
    _members: Map<number, any>;

    constructor({id}: init_params) {
        this._id = id;
        this._members = new Map();
    }

    join(gamer: Gamer): void {
        if (this.countMembers < MAX_MEMBERS) {
            this._members.set(gamer.id, gamer);
        } else {
            throw new Error({name: TOO_MACH_MEMBERS});
        }
    }

    get id(): id_type {
        return this._id;
    }

    get countMembers(): number {
        return this._members.size;
    }
}

export default Game;
