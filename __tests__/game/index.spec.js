import Game from 'game';

describe('Game (class)', () => {
    it('should have instance', ()=> {
        const game = new Game({});

        expect(game).toBeTruthy();
    });
});
