// @flow

/* eslint no-new: "off" */
import Round from 'components/round';
import Player from 'components/player';
import {
    ROUND_STATUS_NOT_READY, ROUND_STATUS_READY,
} from 'components/round';
import type {TypeRoundStoreSnapshot} from 'components/round';
import * as cards from 'components/card';
import {
    PLAYER_ALREADY_PLACED_A_BET, ROUND_WRONG_PLAYER_CARDS_COUNT, WRONG_PLAYER_ORDER,
    ROUND_STEP_WRONG_STATUS, ROUND_STEP_CARD_NOT_EXIST, ROUND_STEP_CARD_INCORRECT,
    WRONG_PLAYERS_COUNT, ROUND_ALREADY_STARTED, ROUND_WRONG_PREDICTION_COUNT, PLAYER_NOT_FOUND,
    ROUND_WRONG_PREDICTION_ORDER_PLAYER,
} from 'errors';

import {fillPlayersCards} from 'utils/player';

import type {PredictionCount} from 'components/round';

const mockInitialPlayers = () =>
    [
        {
            id: '1',
            cards: [cards.CARD_SPADE_QUEEN, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE],
        },
        {
            id: '2',
            cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9],
        },
        {
            id: '3',
            cards: [cards.CARD_HEART_6, cards.CARD_HEART_7, cards.CARD_HEART_8],
        },
    ].map(({id, cards}) => {
        const player = new Player({id});

        fillPlayersCards({players: [player], cards: [cards]});

        return player;
    });

let round;

type PredictionShort = {
    id: string,
    count: PredictionCount,
};

const createPredictions = (predictions: PredictionShort[]) => {
    for (const item of predictions) {
        round.setPrediction(item.id, item.count);
    }
};

describe('Round (class)', () => {
    it('should have instance', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers(),
            currentOrder: 0,
            countCards: 3,
        });

        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
    });

    it('should raise error with wrong players count', () => {
        expect(() => {
            new Round({
                trumpCard: cards.CARD_SPADE_10,
                players: mockInitialPlayers().slice(0, 1),
                currentOrder: 0,
                countCards: 3,
            });
        }).toThrowError(WRONG_PLAYERS_COUNT);

        expect(() => {
            new Round({
                trumpCard: cards.CARD_SPADE_10,
                players: [],
                currentOrder: 0,
                countCards: 3,
            });
        }).toThrowError(WRONG_PLAYERS_COUNT);

        // 7 Players
        expect(() => {
            new Round({
                trumpCard: cards.CARD_SPADE_10,
                players: [...mockInitialPlayers(), ...mockInitialPlayers(), ...mockInitialPlayers()].slice(0, 7),
                currentOrder: 0,
                countCards: 3,
            });
        }).toThrowError(WRONG_PLAYERS_COUNT);
    });

    it('should status to be ready after all players made prediction', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers(),
            currentOrder: 0,
            countCards: 3,
        });

        round.setPrediction('1', 1);
        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
        round.setPrediction('2', 0);
        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
        round.setPrediction('3', 1);

        expect(round.status).toBe(ROUND_STATUS_READY);
    });

    it('should raise error on re-prediction', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers(),
            currentOrder: 0,
            countCards: 3,
        });

        round.setPrediction('1', 1);

        expect(() => round.setPrediction('1', 1)).toThrowError(PLAYER_ALREADY_PLACED_A_BET);
        expect(() => round.setPrediction('1', 0)).toThrowError(PLAYER_ALREADY_PLACED_A_BET);
    });

    it('should raise error on wrong prediction player', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers(),
            currentOrder: 0,
            countCards: 3,
        });

        expect(() => round.setPrediction('2', 1)).toThrowError(ROUND_WRONG_PREDICTION_ORDER_PLAYER);
        expect(() => round.setPrediction('3', 0)).toThrowError(ROUND_WRONG_PREDICTION_ORDER_PLAYER);
    });

    it('should raise error on round not in not_ready status', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers(),
            currentOrder: 0,
            countCards: 3,
        });

        round.setPrediction('1', 1);
        round.setPrediction('2', 1);
        round.setPrediction('3', 1);

        expect(() => {
            round.setPrediction('1', 1);
        }).toThrowError(ROUND_ALREADY_STARTED);
    });

    it('should raise error on wrong prediction count', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers(),
            currentOrder: 0,
            countCards: 3,
        });

        expect(() => {
            round.setPrediction('1', 4);
        }).toThrowError(ROUND_WRONG_PREDICTION_COUNT);

        expect(() => {
            const prediction: any = -1;

            round.setPrediction('1', prediction);
        }).toThrowError(ROUND_WRONG_PREDICTION_COUNT);
    });

    it('should raise error on setPrediction with wrong player id', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers(),
            currentOrder: 0,
            countCards: 3,
        });

        expect(() => {
            round.setPrediction('100500', 1);
        }).toThrowError(PLAYER_NOT_FOUND);
    });

    it('should raise error on wrong countCards', () => {
        expect(() => {
            new Round({
                trumpCard: cards.CARD_SPADE_10,
                players: mockInitialPlayers(),
                currentOrder: 0,
                countCards: 1,
            });
        }).toThrowError(ROUND_WRONG_PLAYER_CARDS_COUNT);
    });

    describe('createStep', () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_SPADE_10,
                players: mockInitialPlayers(),
                currentOrder: 0,
                countCards: 3,
            });
        });

        it('should raise on wrond status', () => {
            expect(() => {
                round.createStep({
                    playerId: '1',
                    card: cards.CARD_HEART_ACE,
                });
            }).toThrowError(ROUND_STEP_WRONG_STATUS);
        });

        it('should raise on wrond player', () => {
            createPredictions([
                {id: '1', count: 2},
                {id: '2', count: 0},
                {id: '3', count: 3},
            ]);

            expect(() => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_HEART_ACE,
                });
            }).toThrowError(WRONG_PLAYER_ORDER);

            expect(() => {
                round.createStep({
                    playerId: '20',
                    card: cards.CARD_HEART_ACE,
                });
            }).toThrowError(WRONG_PLAYER_ORDER);
        });

        it('should create attack step', () => {
            createPredictions([
                {id: '1', count: 2},
                {id: '2', count: 0},
                {id: '3', count: 3},
            ]);

            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_ACE,
            });

            const snapshot = round.getSnapshot();

            expect(snapshot.currentOrder).toBe(1);
            expect(snapshot.currentStepStore).toEqual([{playerId: '1', card: cards.CARD_HEART_ACE}]);
        });

        it('should raise on unexisted card', () => {
            createPredictions([
                {id: '1', count: 2},
                {id: '2', count: 0},
                {id: '3', count: 3},
            ]);

            expect(() => {
                round.createStep({
                    playerId: '1',
                    card: cards.CARD_SPADE_JACK,
                });
            }).toThrowError(ROUND_STEP_CARD_NOT_EXIST);
        });

        describe('defense step', () => {
            beforeEach(() => {
                createPredictions([
                    {id: '1', count: 2},
                    {id: '2', count: 0},
                    {id: '3', count: 3},
                ]);

                round.createStep({
                    playerId: '1',
                    card: cards.CARD_HEART_ACE,
                });
            });

            it('should create defense step', () => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_HEART_9,
                });

                const snapshot = round.getSnapshot();

                expect(snapshot.currentOrder).toBe(2);
                expect(snapshot.currentStepStore).toEqual([
                    {playerId: '1', card: cards.CARD_HEART_ACE},
                    {playerId: '2', card: cards.CARD_HEART_9},
                ]);
            });

            it('should raise error with wrong suit', () => {
                expect(() => {
                    round.createStep({
                        playerId: '2',
                        card: cards.CARD_SPADE_KING,
                    });
                }).toThrowError(ROUND_STEP_CARD_INCORRECT);
            });
        });
    });

    describe('create defense step with jack spade as defense card', () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_HEART_7,
                players: [
                    {
                        id: '1',
                        cards: [cards.CARD_SPADE_10, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE],
                    },
                    {
                        id: '2',
                        cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_10, cards.CARD_HEART_9],
                    },
                    {
                        id: '3',
                        cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_10, cards.CARD_CLUB_9],
                    },
                ].map(({id, cards}) => {
                    const player = new Player({id});

                    player.fillCards(cards);
                    return player;
                }),
                currentOrder: 0,
                countCards: 3,
            });

            createPredictions([
                {id: '1', count: 2},
                {id: '2', count: 0},
                {id: '3', count: 0},
            ]);
        });

        it('should allow jack spade vs simple card', () => {
            round.createStep({
                playerId: '1',
                card: cards.CARD_SPADE_10,
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_SPADE_JACK,
            });

            const snapshot = round.getSnapshot();

            expect(snapshot.currentOrder).toBe(2);
            expect(snapshot.currentStepStore).toEqual([
                {playerId: '1', card: cards.CARD_SPADE_10},
                {playerId: '2', card: cards.CARD_SPADE_JACK},
            ]);
        });

        it('should allow jack spade vs trump card', () => {
            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_ACE,
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_SPADE_JACK,
            });

            const snapshot = round.getSnapshot();

            expect(snapshot.currentOrder).toBe(2);
            expect(snapshot.currentStepStore).toEqual([
                {playerId: '1', card: cards.CARD_HEART_ACE},
                {playerId: '2', card: cards.CARD_SPADE_JACK},
            ]);
        });
    });

    describe('create defense step with jack spade as attack card', () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_HEART_7,
                players: [
                    {
                        id: '1',
                        cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE],
                    },
                    {
                        id: '2',
                        cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9],
                    },
                    {
                        id: '3',
                        cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_10, cards.CARD_CLUB_9],
                    },
                ].map(({id, cards}) => {
                    const player = new Player({id});

                    player.fillCards(cards);
                    return player;
                }),
                currentOrder: 0,
                countCards: 3,
            });

            createPredictions([
                {id: '1', count: 2},
                {id: '2', count: 0},
                {id: '3', count: 0},
            ]);

            round.createStep({
                playerId: '1',
                card: cards.CARD_SPADE_JACK,
            });
        });

        it('should allow the greatest card', () => {
            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_10,
            });

            const snapshot = round.getSnapshot();

            expect(snapshot.currentOrder).toBe(2);
            expect(snapshot.currentStepStore).toEqual([
                {playerId: '1', card: cards.CARD_SPADE_JACK},
                {playerId: '2', card: cards.CARD_HEART_10},
            ]);
        });

        it('shouldn\'t allow not trump greatest card', () => {
            expect(() => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_HEART_9,
                });
            }).toThrowError(ROUND_STEP_CARD_INCORRECT);

            expect(() => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_SPADE_KING,
                });
            }).toThrowError(ROUND_STEP_CARD_INCORRECT);

            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_10,
            });

            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_10,
            });

            const snapshot = round.getSnapshot();

            expect(snapshot.currentOrder).toBe(0);
            expect(snapshot.players[0].points).toBe(1);
            expect(snapshot.players[1].points).toBe(0);
            expect(snapshot.players[2].points).toBe(0);
        });
    });

    describe('create defense step with trump as attack card', () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_HEART_7,
                players: [
                    {
                        id: '1',
                        cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE],
                    },
                    {
                        id: '2',
                        cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9],
                    },
                    {
                        id: '3',
                        cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_10, cards.CARD_CLUB_9],
                    },
                ].map(({id, cards}) => {
                    const player = new Player({id});

                    player.fillCards(cards);
                    return player;
                }),
                currentOrder: 0,
                countCards: 3,
            });

            createPredictions([
                {id: '1', count: 2},
                {id: '2', count: 0},
                {id: '3', count: 0},
            ]);

            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_QUEEN,
            });
        });

        it('should allow correct suit card', () => {
            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_10,
            });

            let snapshot = round.getSnapshot();

            expect(snapshot.currentOrder).toBe(2);
            expect(snapshot.currentStepStore).toEqual([
                {playerId: '1', card: cards.CARD_HEART_QUEEN},
                {playerId: '2', card: cards.CARD_HEART_10},
            ]);

            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_KING,
            });

            snapshot = round.getSnapshot();

            expect(snapshot.currentOrder).toBe(0);
            expect(round.status).toBe(ROUND_STATUS_READY);
            expect(snapshot.players[0].points).toBe(1);
            expect(snapshot.players[1].points).toBe(0);
            expect(snapshot.players[2].points).toBe(0);
        });
    });

    describe('full round', () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_HEART_7,
                players: [
                    {
                        id: '1',
                        cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE],
                    },
                    {
                        id: '2',
                        cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9],
                    },
                    {
                        id: '3',
                        cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_10, cards.CARD_CLUB_9],
                    },
                ].map(({id, cards}) => {
                    const player = new Player({id});

                    player.fillCards(cards);
                    return player;
                }),
                currentOrder: 2,
                countCards: 3,
            });

            createPredictions([
                {id: '3', count: 0},
                {id: '1', count: 2},
                {id: '2', count: 0},
            ]);
        });

        it('should work all round with correct steps', () => {
            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_10,
            });

            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_QUEEN,
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_SPADE_KING,
            });

            // Player: 1 won
            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_ACE,
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_9,
            });

            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_KING,
            });

            // 'Player 1' won
            round.createStep({
                playerId: '1',
                card: cards.CARD_SPADE_JACK,
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_10,
            });

            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_9,
            });

            const snapshot = round.getSnapshot();

            expect(snapshot.players[0].points).toBe(3);
            expect(snapshot.players[1].points).toBe(0);
            expect(snapshot.players[2].points).toBe(0);
        });

        it('shouldn\'t allow use old cards', () => {
            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_10,
            });

            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_QUEEN,
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_SPADE_KING,
            });

            // 'Player 1' won
            expect(() => {
                round.createStep({
                    playerId: '1',
                    card: cards.CARD_HEART_QUEEN,
                });
            }).toThrowError(ROUND_STEP_CARD_NOT_EXIST);

            expect(() => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_SPADE_KING,
                });
            }).toThrowError(WRONG_PLAYER_ORDER);
        });
    });
});

describe('Round (class) restore game', () => {
    beforeEach(() => {
        round = new Round({
            trumpCard: cards.CARD_HEART_7,
            players: [
                {
                    id: '1',
                    cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE],
                },
                {
                    id: '2',
                    cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9],
                },
                {
                    id: '3',
                    cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_10, cards.CARD_CLUB_9],
                },
            ].map(({id, cards}) => {
                const player = new Player({id});

                player.fillCards(cards);
                return player;
            }),
            currentOrder: 2,
            countCards: 3,
        });

        createPredictions([
            {id: '3', count: 0},
            {id: '1', count: 2},
            {id: '2', count: 0},
        ]);

        round.createStep({
            playerId: '3',
            card: cards.CARD_CLUB_10,
        });

        round.createStep({
            playerId: '1',
            card: cards.CARD_HEART_QUEEN,
        });
    });

    it('should work getSpapshot', () => {
        const snapshot: TypeRoundStoreSnapshot = round.getSnapshot();

        expect(snapshot.trumpCard).toBe(cards.CARD_HEART_7);
        expect(snapshot.id).toBe(round.id);
        expect(snapshot.status).toBe(round.status);
        expect(snapshot.status).toBe(ROUND_STATUS_READY);
        expect(snapshot.countCards).toBe(3);
        expect(snapshot.currentStepNumber).toBe(1);
        expect(snapshot.attackOrder).toBe(2);
        expect(snapshot.currentOrder).toBe(1);
        expect(snapshot.players).toEqual([
            {
                points: 0,
                prediction: 2,
                player: {
                    id: '1',
                    cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_ACE],
                },
                voted: true,
            },
            {
                points: 0,
                prediction: 0,
                player: {
                    id: '2',
                    cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9],
                },
                voted: true,
            },
            {
                points: 0,
                prediction: 0,
                player: {
                    id: '3',
                    cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_9],
                },
                voted: true,
            },
        ]);
        expect(snapshot.currentStepStore).toEqual([
            {
                playerId: '3',
                card: cards.CARD_CLUB_10,
            },
            {
                playerId: '1',
                card: cards.CARD_HEART_QUEEN,
            },
        ]);
    });

    it('should restore snapshot', () => {
        const snapshot: TypeRoundStoreSnapshot = round.getSnapshot();
        round = new Round();
        round.restore(snapshot);

        expect(snapshot.id).toBe(round.id);
        expect(snapshot.status).toBe(round.status);
        expect(snapshot.trumpCard).toBe(cards.CARD_HEART_7);

        round.createStep({
            playerId: '2',
            card: cards.CARD_HEART_10,
        });
    });
});
