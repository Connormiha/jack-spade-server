// @flow

import games from 'components/games';
import apiCreateGame from 'api/game/create';
import {anyObject} from 'mock/objects';

describe('API game/create', () => {
    afterEach(() => {
        games.clear();
    });

    it('should create game', () => {
        const json = jest.fn();
        const response: express$Response = Object.assign(anyObject(), {json});
        const request: express$Request = anyObject();

        apiCreateGame(request, response);

        expect(json).toHaveBeenCalledTimes(1);
        expect(games.count).toBe(1);
    });
});
