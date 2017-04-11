// @flow

import users from 'users';
import User from 'user';
import apiDeleteUser from 'api/user/delete';
import {anyObject} from 'mock/objects';

describe('API user/delete', () => {
    afterEach(() => {
        users.clear();
    });

    it('should raise error', () => {
        const end = jest.fn();
        const status = jest.fn();
        const response: express$Response = Object.assign(anyObject(), {end, status});
        const request: express$Request = Object.assign(anyObject(), {body: {id: 1}});

        apiDeleteUser(request, response);

        expect(end).toHaveBeenCalledTimes(1);
        expect(status).toHaveBeenCalledWith(400);
        expect(status).toHaveBeenCalledTimes(1);
        expect(users.count).toBe(0);
    });

    it('should success delete exist user', () => {
        const user = new User({id: '1'});

        users.add(user);

        const end = jest.fn();
        const status = jest.fn();
        const response: express$Response = Object.assign(anyObject(), {end, status});
        const request: express$Request = Object.assign(anyObject(), {body: {id: user.id}});

        expect(users.count).toBe(1);

        apiDeleteUser(request, response);

        expect(end).toHaveBeenCalledTimes(1);
        expect(status).toHaveBeenCalledWith(204);
        expect(status).toHaveBeenCalledTimes(1);
        expect(users.count).toBe(0);
    });
});
