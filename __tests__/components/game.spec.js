// @flow

import {TOO_MACH_MEMBERS, GAME_PLAYER_ALREADY_EXIST} from 'errors';
import Game, {MAX_MEMBERS} from 'components/game';
import Player from 'components/player';

describe('Game (class)', () => {
    it('should have instance', () => {
        const game = new Game({id: '1'});

        expect(game).toBeInstanceOf(Game);
        expect(game.id).toBe('1');
    });

    it('should join all players', () => {
        const game = new Game({id: '1'});

        for (let i = 1; i <= MAX_MEMBERS; i++) {
            game.joinPlayer(new Player({id: String(i)}));
            expect(game.countMembers).toBe(i);
        }
    });

    it('shouldn\'t join excess player', () => {
        const game = new Game({id: '1'});

        for (let i = 1; i <= MAX_MEMBERS; i++) {
            game.joinPlayer(new Player({id: String(i)}));
        }

        expect(() => {
            game.joinPlayer(new Player({id: 'foo'}));
        }).toThrowError(TOO_MACH_MEMBERS);
    });

    it('shouldn\'t join exist player', () => {
        const game = new Game({id: '1'});

        game.joinPlayer(new Player({id: '1'}));

        expect(() => {
            game.joinPlayer(new Player({id: '1'}));
        }).toThrowError(GAME_PLAYER_ALREADY_EXIST);
    });
});
