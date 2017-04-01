// @flow

import users from 'users';

const deleteUser = (id: number): any => {
    const success = users.deleteGame(id);

    return {
        success
    };
};

export default deleteUser;
