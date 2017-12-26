// @flow

import users from 'components/users';
import User from 'components/user';
import apiDeleteUser from 'api/user/delete';

describe('API user/delete', () => {
    afterEach(() => {
        users.clear();
    });

    it('should raise error', () => {
        const result = apiDeleteUser({id: 1});

        expect(result.status).toBe(400);
        expect(users.count).toBe(0);
    });

    it('should success delete exist user', () => {
        const user = new User({id: '1'});

        users.add(user);

        expect(users.count).toBe(1);

        const result = apiDeleteUser({id: user.id});

        expect(result.status).toBe(204);
        expect(users.count).toBe(0);
    });
});
