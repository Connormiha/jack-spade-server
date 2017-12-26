// @flow

import reducer from 'components/request/reducer';
import {anyObject} from 'mock/objects';
import games from 'components/games';
import Game from 'components/game';
import {GAME_NOT_FOUND} from 'errors';

describe('Request reducer', () => {
    describe('game addPlayer', () => {
        it('should success join player', () => {
            const game: Game = new Game({id: '1'});

            games.add(game);

            const json = jest.fn();
            const status = jest.fn();
            const end = jest.fn();
            const response: express$Response = Object.assign(anyObject(), {json, end, status});

            reducer({gameId: '1'}, response, 'ADD_PLAYER');

            expect(json).toHaveBeenCalledTimes(1);
            expect(game.countMembers).toBe(1);
        });

        it('should raise error after joining to unexisted game', () => {
            const game: Game = new Game({id: '1'});

            games.add(game);

            const json = jest.fn();
            const status = jest.fn();
            const end = jest.fn();
            const response: express$Response = Object.assign(anyObject(), {json, end, status});

            reducer({gameId: '2'}, response, 'ADD_PLAYER');

            expect(json).toHaveBeenCalledTimes(1);
            expect(json).toHaveBeenCalledWith({error: GAME_NOT_FOUND});
            expect(game.countMembers).toBe(0);
        });
    });
});
