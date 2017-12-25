// @flow

import Game from 'components/game';
import games from 'components/games';
import deleteGame from 'actions/games/deleteGame';

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
