// @flow

import users from 'components/users';
import apiCreateUser from 'api/user/create';

describe('API user/create', () => {
    afterEach(() => {
        users.clear();
    });

    it('should create user', () => {
        const result = apiCreateUser();

        expect(result.status).toBe(200);
        expect(result.message.id).toBeTruthy();
        expect(users.count).toBe(1);
    });
});
