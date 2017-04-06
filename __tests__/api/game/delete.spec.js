// @flow

import games from 'games';
import Game from 'game';
import apiDeleteGame from 'api/game/delete';
import {anyObject} from 'mock/objects';

describe('API game/delete', () => {
    afterEach(() => {
        games.clear();
    });

    it('should raise error', () => {
        const end = jest.fn();
        const status = jest.fn();
        const response: express$Response = Object.assign(anyObject(), {end, status});
        const request: express$Request = Object.assign(anyObject(), {body: {id: 1}});

        apiDeleteGame(request, response);

        expect(end).toHaveBeenCalledTimes(1);
        expect(status).toHaveBeenCalledWith(400);
        expect(status).toHaveBeenCalledTimes(1);
        expect(games.count).toBe(0);
    });

    it('should success delete exist game', () => {
        const game = new Game({id: 1});

        games.add(game);

        const end = jest.fn();
        const status = jest.fn();
        const response: express$Response = Object.assign(anyObject(), {end, status});
        const request: express$Request = Object.assign(anyObject(), {body: {id: game.id}});

        expect(games.count).toBe(1);

        apiDeleteGame(request, response);

        expect(end).toHaveBeenCalledTimes(1);
        expect(status).toHaveBeenCalledWith(204);
        expect(status).toHaveBeenCalledTimes(1);
        expect(games.count).toBe(0);
    });
});
