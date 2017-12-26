// @flow

import games from 'components/games';
import Game from 'components/game';
import apiAddPlayer from 'api/game/addPlayer';
import {MAX_MEMBERS} from 'components/game';
import {TOO_MACH_MEMBERS, GAME_NOT_FOUND} from 'errors';

describe('API game/addPlayer', () => {
    afterEach(() => {
        games.clear();
    });

    it('should success join player', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        const result = apiAddPlayer({gameId: '1'});

        expect(result.status).toBe(200);
        expect(game.countMembers).toBe(1);
    });

    it('should raise error after joining to unexisted game', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        const result = apiAddPlayer({gameId: '2'});

        expect(result).toEqual({
            message: {error: GAME_NOT_FOUND},
            status: 400,
        });
        expect(game.countMembers).toBe(0);
    });

    it('should raise error after joining excess player', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        // let json: any;
        // let status: any;
        // let response: express$Response;
        // let request: express$Request;

        for (let i = 0; i < MAX_MEMBERS; i++) {
            // json = jest.fn();
            // status = jest.fn();
            // response = Object.assign(anyObject(), {json, status});
            // request = Object.assign(anyObject(), {body: {gameId: '1'}});

            const result = apiAddPlayer({gameId: '1'});

            expect(result.status).toBe(200);
            expect(game.countMembers).toBe(i + 1);
        }

        const result = apiAddPlayer({gameId: '1'});

        expect(game.countMembers).toBe(MAX_MEMBERS);
        expect(result).toEqual({
            status: 400,
            message: {error: TOO_MACH_MEMBERS},
        });
    });
});
