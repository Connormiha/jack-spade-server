// @flow

import users from 'users';

const deleteUser = (id: string): any => {
    const success = users.delete(id);

    return {
        success
    };
};

export default deleteUser;
