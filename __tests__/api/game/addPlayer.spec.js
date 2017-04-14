// @flow

import games from 'games';
import Game from 'game';
import apiAddPlayer from 'api/game/addPlayer';
import {anyObject} from 'mock/objects';
import {MAX_MEMBERS} from 'game';
import {TOO_MACH_MEMBERS, GAME_NOT_FOUND} from 'errors';

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

    it('should raise error after joining to unexisted game', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        const json = jest.fn();
        const status = jest.fn();
        const response: express$Response = Object.assign(anyObject(), {json, status});
        const request: express$Request = Object.assign(anyObject(), {body: {gameId: '2'}});

        apiAddPlayer(request, response);

        expect(json).toHaveBeenCalledTimes(1);
        expect(json).toHaveBeenCalledWith({error: GAME_NOT_FOUND});
        expect(game.countMembers).toBe(0);
    });

    it('should raise error after joining excess player', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        let json: any;
        let status: any;
        let response: express$Response;
        let request: express$Request;

        for (let i = 0; i < MAX_MEMBERS; i++) {
            json = jest.fn();
            status = jest.fn();
            response = Object.assign(anyObject(), {json, status});
            request = Object.assign(anyObject(), {body: {gameId: '1'}});

            apiAddPlayer(request, response);

            expect(json).toHaveBeenCalledTimes(1);
            expect(game.countMembers).toBe(i + 1);
        }

        json = jest.fn();
        status = jest.fn();
        response = Object.assign(anyObject(), {json, status});
        request = Object.assign(anyObject(), {body: {gameId: '1'}});

        apiAddPlayer(request, response);

        expect(game.countMembers).toBe(MAX_MEMBERS);
        expect(json).toHaveBeenCalledTimes(1);
        expect(json).toHaveBeenCalledWith({error: TOO_MACH_MEMBERS});
        expect(status).toHaveBeenCalledWith(400);
    });
});
