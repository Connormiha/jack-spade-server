// @flow

import users from 'components/users';
import apiCreateGame from 'api/user/create';
import {anyObject} from 'mock/objects';

describe('API user/create', () => {
    afterEach(() => {
        users.clear();
    });

    it('should create user', () => {
        const json = jest.fn();
        const response: express$Response = Object.assign(anyObject(), {json});
        const request: express$Request = anyObject();

        apiCreateGame(request, response);

        expect(json).toHaveBeenCalledTimes(1);
        expect(users.count).toBe(1);
    });
});
