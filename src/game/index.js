// @flow

type id_type = number;
type init_params = {id: id_type};

class Game {
    _id: id_type;
    _members: Map<number, any>;

    constructor({id}: init_params) {
        this._id = id;
        this._members = new Map();
    }

    get id(): id_type {
        return this._id;
    }
}

export default Game;
