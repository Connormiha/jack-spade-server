// @flow

type TypeId = string;
type TypeInitParams = {id: TypeId};

class User {
    _id: TypeId;

    constructor({id}: TypeInitParams) {
        this._id = id;
    }

    get id(): TypeId {
        return this._id;
    }
}

export default User;
