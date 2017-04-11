// @flow

import Game from 'game';
import games from 'games';
import deleteGame from 'actions/deleteGame';

describe('Actions deleteGame', () => {
    afterEach(() => {
        games.clear();
    });

    it('should delete game', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        expect(games.count).toBe(1);

        const result = deleteGame(game.id);

        expect(games.count).toBe(0);
        expect(result).toEqual({success: true});
    });
});
