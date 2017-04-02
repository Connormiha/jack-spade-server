// @flow

import users from 'users';

const deleteUser = (id: number): any => {
    const success = users.delete(id);

    return {
        success
    };
};

export default deleteUser;
