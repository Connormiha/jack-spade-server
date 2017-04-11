// @flow

import users from 'users';
import User from 'user';

let id: number = 0;

const createUser = (): User => {
    id++;

    const user: User = new User({id: String(id)});

    users.add(user);

    return user;
};

export default createUser;
