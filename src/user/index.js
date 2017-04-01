// @flow

type id_type = number;
type init_params = {id: id_type};

class User {
    _id: id_type;
    constructor({id}: init_params) {
        this._id = id;
    }

    get id(): id_type {
        return this._id;
    }
}

export default User;
