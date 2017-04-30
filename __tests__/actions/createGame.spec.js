// @flow

import Game from 'components/game';
import createGame from 'actions/createGame';

describe('Actions createGame', () => {
    it('should create game', () => {
        const game: Game = createGame();

        expect(game).toBeInstanceOf(Game);
    });
});
