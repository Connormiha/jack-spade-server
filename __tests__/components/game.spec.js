// @flow

import {
    TOO_MACH_MEMBERS, GAME_PLAYER_ALREADY_EXIST, TOO_FEW_MEMBERS,
    GAME_CURRENT_ROUND_NOT_FINISHED, ROUND_WRONG_PREDICTION_ORDER_PLAYER,
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

describe('Game (class) start round', () => {
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
        expect(game.roundNumber).toBe(1);
    });

    it('shouldn\'t start when current round is not finished', () => {
        game.joinPlayer(player1);
        game.joinPlayer(player2);

        game.nextRound();

        expect(() => {
            game.nextRound();
        }).toThrowError(GAME_CURRENT_ROUND_NOT_FINISHED);
    });
});

describe('Game (class) countCards', () => {
    const game: Game = new Game({id: '1'});

    [
        {round: 1, count: 1},
        {round: 2, count: 2},
        {round: 3, count: 3},
        {round: 4, count: 4},
        {round: 5, count: 5},
        {round: 6, count: 6},
        {round: 7, count: 6},
        {round: 8, count: 5},
        {round: 9, count: 4},
        {round: 10, count: 3},
        {round: 11, count: 2},
        {round: 12, count: 1},
        {round: 13, count: 1},
    ].forEach(({round, count}) =>
        it(`should be ${count} cards in ${round} round`, () => {
            game.restore({
                id: '1',
                currentRoundNumber: round,
                mainPlayerId: '1',
                status: GAME_STATUS_IN_PROGRESS,
                players: [
                    {
                        id: '1',
                        cards: [],
                    },
                    {
                        id: '2',
                        cards: [],
                    }
                ]
            });

            expect(game.countCards).toBe(count);
        })
    );
});

describe('Game (class) setPrediction', () => {
    let game: Game;
    let player1: Player;
    let player2: Player;

    beforeEach(() => {
        game = new Game({id: '1'});
        player1 = new Player({id: '1'});
        player2 = new Player({id: '2'});
    });

    it('should throw error on wrong playerId', () => {
        game.joinPlayer(player1);
        game.joinPlayer(player2);
        game.nextRound();

        expect(() => {
            game.setPrediction({
                playerId: '2',
                count: 1,
                roundId: game.roundId,
            });
        }).toThrowError(ROUND_WRONG_PREDICTION_ORDER_PLAYER);
    });

    it('should corrent sets prediction', () => {
        game.joinPlayer(player1);
        game.joinPlayer(player2);
        game.nextRound();
        game.setPrediction({
            playerId: '1',
            count: 1,
            roundId: game.roundId,
        });

        game.setPrediction({
            playerId: '2',
            count: 1,
            roundId: game.roundId,
        });
    });
});

// describe('Game (class) restore', () => {
//     let game: Game;
//     let player1: Player;
//     let player2: Player;
//
//     beforeEach(() => {
//         game = new Game({id: '1'});
//         player1 = new Player({id: '1'});
//         player2 = new Player({id: '2'});
//     });
//
//     it('should restore 1st round', () => {
//         game.joinPlayer(player1);
//         game.joinPlayer(player2);
//         game.nextRound();
//         game.setPrediction({
//
//         });
//     });
// });
