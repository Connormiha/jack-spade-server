// @flow

import User from 'components/user';
import createUser from 'actions/createUser';

describe('Actions createUser', () => {
    it('should create user', () => {
        const user: User = createUser();

        expect(user).toBeInstanceOf(User);
    });
});
