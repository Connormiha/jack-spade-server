// @flow

import type User from 'user';

export class Users {
    _users: Map<number, any>;

    constructor() {
        this._users = new Map();
    }

    add(user: User) {
        this._users.set(user.id, user);
    }

    delete(id: number): boolean {
        const hasUser = this._users.has(id);

        this._users.delete(id);

        return hasUser;
    }

    get count(): number {
        return this._users.size;
    }
}

export default new Users();
