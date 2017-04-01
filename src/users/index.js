export class Users {
    constructor() {
        this._users = new Map();
    }

    add(user) {
        this._users.set(user.id, user);
    }

    delete(id) {
        const hasUser = this._users.has(id);

        this._users.delete(id);

        return hasUser;
    }

    getCount() {
        return this._users.size;
    }
}

export default new Users();
