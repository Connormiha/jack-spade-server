// @flow

import games from 'games';
import Game from 'game';
import apiAddPlayer from 'api/game/addPlayer';
import {anyObject} from 'mock/objects';

describe('API game/addPlayer', () => {
    afterEach(() => {
        games.clear();
    });

    it('should success join player', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        const json = jest.fn();
        const status = jest.fn();
        const response: express$Response = Object.assign(anyObject(), {json, status});
        const request: express$Request = Object.assign(anyObject(), {body: {gameId: '1'}});

        apiAddPlayer(request, response);

        expect(json).toHaveBeenCalledTimes(1);
        expect(game.countMembers).toBe(1);
    });
});
