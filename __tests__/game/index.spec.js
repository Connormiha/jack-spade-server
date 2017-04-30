// @flow

import Game from 'components/game';

describe('Game (class)', () => {
    it('should have instance', ()=> {
        const game = new Game({id: '1'});

        expect(game).toBeInstanceOf(Game);
        expect(game.id).toBe('1');
    });
});
