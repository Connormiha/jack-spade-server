// @flow

import reducer from 'components/request/reducer';
import games from 'components/games';
import Game from 'components/game';
import {GAME_NOT_FOUND} from 'errors';

describe('Request reducer', () => {
    describe('game addPlayer', () => {
        it('should success join player', () => {
            const game: Game = new Game({id: '1'});

            games.add(game);

            const result = reducer({gameId: '1'}, 'ADD_PLAYER');

            expect(result.status).toBe(200);
            expect(result.message).toEqual({
                id: game.getSnapshot().players[0].id,
            });
            expect(game.countMembers).toBe(1);
        });

        it('should raise error after joining to unexisted game', () => {
            const game: Game = new Game({id: '1'});

            games.add(game);

            const result = reducer({gameId: '2'}, 'ADD_PLAYER');

            expect(result.status).toBe(400);
            expect(result.message).toEqual({error: GAME_NOT_FOUND});
            expect(game.countMembers).toBe(0);
        });
    });
});
