// @flow

import games from 'components/games';
import Game from 'components/game';
import apiDeleteGame from 'api/game/delete';

describe('API game/delete', () => {
    afterEach(() => {
        games.clear();
    });

    it('should raise error', () => {
        const result = apiDeleteGame({id: '1'});

        expect(result.status).toBe(400);
        expect(games.count).toBe(0);
    });

    it('should success delete exist game', () => {
        const game = new Game({id: '1'});

        games.add(game);

        expect(games.count).toBe(1);

        const result = apiDeleteGame({id: game.id});

        expect(result.status).toBe(204);
        expect(games.count).toBe(0);
    });
});
