// @flow
it('mock', () => {
    // mock
});

/*
import handler from 'components/request/handler';
import {anyObject} from 'mock/objects';
import games from 'components/games';
import Game from 'components/game';

describe('Request handler', () => {
    it('should success join player', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        const json = jest.fn();
        const status = jest.fn();
        const end = jest.fn();
        const request: express$Request = Object.assign(anyObject(), {body: {gameId: '1', type: 'ADD_PLAYER'}});
        const response: express$Response = Object.assign(anyObject(), {json, end, status});

        handler(request, response);

        expect(json).toHaveBeenCalledWith({
            id: game.getSnapshot().players[0].id,
        });
        expect(json).toHaveBeenCalledTimes(1);
        expect(status).toHaveBeenCalledWith(200);
        expect(status).toHaveBeenCalledTimes(1);
        expect(game.countMembers).toBe(1);
    });
});
*/
