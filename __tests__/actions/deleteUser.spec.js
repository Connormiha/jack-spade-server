// @flow

import User from 'components/user';
import users from 'components/users';
import deleteUser from 'actions/deleteUser';

describe('Actions deleteUser', () => {
    afterEach(() => {
        users.clear();
    });

    it('should delete user', () => {
        const user: User = new User({id: '1'});

        users.add(user);

        expect(users.count).toBe(1);

        const result = deleteUser(user.id);

        expect(users.count).toBe(0);
        expect(result).toEqual({success: true});
    });
});
