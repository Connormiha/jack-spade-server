// @flow

import type User from 'components/user';

export class Users {
    _users: Map<string, any>;

    constructor() {
        this._users = new Map();
    }

    add(user: User) {
        this._users.set(user.id, user);
    }

    delete(id: string): boolean {
        const hasUser = this._users.has(id);

        this._users.delete(id);

        return hasUser;
    }

    clear() {
        this._users = new Map();
    }

    get count(): number {
        return this._users.size;
    }
}

export default new Users();
