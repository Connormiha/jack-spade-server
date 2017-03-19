const Game = require('game');

describe('Game (class)', () => {
    it('should have instance', ()=> {
        let game = new Game({});

        expect(game).toBeTruthy();
    });
});
