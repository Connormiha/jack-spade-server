// @flow

import {
    TOO_MACH_MEMBERS, GAME_PLAYER_ALREADY_EXIST, TOO_FEW_MEMBERS
} from 'errors';
import Game, {
    MAX_MEMBERS, GAME_STATUS_WAITING, GAME_STATUS_IN_PROGRESS
} from 'components/game';
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

describe('Game (class) startGame', () => {
    let game: Game;
    let player1: Player;
    let player2: Player;

    beforeEach(() => {
        game = new Game({id: '1'});
        player1 = new Player({id: '1'});
        player2 = new Player({id: '2'});
    });

    it('shouldn\t start with less than 2 players', () => {
        expect(() => {
            game.nextRound();
        }).toThrowError(TOO_FEW_MEMBERS);

        game.joinPlayer(player1);

        expect(() => {
            game.nextRound();
        }).toThrowError(TOO_FEW_MEMBERS);
    });

    it('should start with more than 1 player', () => {
        game.joinPlayer(player1);
        game.joinPlayer(player2);

        expect(game.status).toBe(GAME_STATUS_WAITING);

        game.nextRound();
        expect(game.status).toBe(GAME_STATUS_IN_PROGRESS);
    });
});
