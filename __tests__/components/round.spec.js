// @flow

import Round from 'components/round';
import {
    ROUND_STATUS_NOT_READY, ROUND_STATUS_READY
} from 'components/round';
import * as cards from 'components/card';
import {
    PLAYER_ALREADY_PLACED_A_BET, ROUND_WRONG_PLAYER_CARDS_COUNT, WRONG_PLAYER_ORDER,
    ROUND_STEP_WRONG_STATUS, ROUND_STEP_CARD_NOT_EXIST, ROUND_STEP_CARD_INCORRECT
} from 'errors';

const mockInitialPlayers = [
    {
        id: '1',
        cards: [cards.CARD_SPADE_QUEEN, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE]
    },
    {
        id: '2',
        cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9]
    },
    {
        id: '3',
        cards: [cards.CARD_HEART_6, cards.CARD_HEART_7, cards.CARD_HEART_8]
    }
];

let round;

const createPredictions = (predictions: any) => {
    for (const key in predictions) {
        if (predictions.hasOwnProperty(key)) {
            round.seеPrediction(key, predictions[key]);
        }
    }
};

describe('Round (class)', () => {
    it('should have instance', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers,
            currentOrder: 0,
            cardsCount: 3
        });

        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
    });

    it('should status to be ready after all players made prediction', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers,
            currentOrder: 0,
            cardsCount: 3
        });

        round.seеPrediction('1', 1);
        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
        round.seеPrediction('2', 0);
        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
        round.seеPrediction('3', 1);

        expect(round.status).toBe(ROUND_STATUS_READY);
    });

    it('should raise error on re-prediction', () => {
        round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers,
            currentOrder: 0,
            cardsCount: 3
        });

        round.seеPrediction('1', 1);

        expect(() => round.seеPrediction('1', 1)).toThrowError(PLAYER_ALREADY_PLACED_A_BET);
        expect(() => round.seеPrediction('1', 0)).toThrowError(PLAYER_ALREADY_PLACED_A_BET);
    });

    it('should raise error on wrong cardsCount', () => {
        expect(() => {
            new Round({
                trumpCard: cards.CARD_SPADE_10,
                players: mockInitialPlayers,
                currentOrder: 0,
                cardsCount: 1
            });
        }).toThrowError(ROUND_WRONG_PLAYER_CARDS_COUNT);
    });

    describe('createStep' , () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_SPADE_10,
                players: mockInitialPlayers,
                currentOrder: 0,
                cardsCount: 3
            });
        });

        it('should raise on wrond status', () => {
            expect(() => {
                round.createStep({
                    playerId: '1',
                    card: cards.CARD_HEART_ACE
                });
            }).toThrowError(ROUND_STEP_WRONG_STATUS);
        });

        it('should raise on wrond player', () => {
            createPredictions({
                '1': 2,
                '2': 0,
                '3': 3
            });

            expect(() => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_HEART_ACE
                });
            }).toThrowError(WRONG_PLAYER_ORDER);

            expect(() => {
                round.createStep({
                    playerId: '20',
                    card: cards.CARD_HEART_ACE
                });
            }).toThrowError(WRONG_PLAYER_ORDER);
        });

        it('should create attack step', () => {
            createPredictions({
                '1': 2,
                '2': 0,
                '3': 3
            });

            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_ACE
            });

            const statistic = round.getStatistic();

            expect(statistic.currentOrder).toBe(1);
            expect(statistic.currentStepStore).toEqual([{playerId: '1', card: cards.CARD_HEART_ACE}]);
        });

        it('should raise on unexisted card', () => {
            createPredictions({
                '1': 2,
                '2': 0,
                '3': 3
            });

            expect(() => {
                round.createStep({
                    playerId: '1',
                    card: cards.CARD_SPADE_JACK
                });
            }).toThrowError(ROUND_STEP_CARD_NOT_EXIST);
        });

        describe('defense step' , () => {
            beforeEach(() => {
                createPredictions({
                    '1': 2,
                    '2': 0,
                    '3': 3
                });

                round.createStep({
                    playerId: '1',
                    card: cards.CARD_HEART_ACE
                });
            });

            it('should create defense step', () => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_HEART_9
                });

                const statistic = round.getStatistic();

                expect(statistic.currentOrder).toBe(2);
                expect(statistic.currentStepStore).toEqual([
                    {playerId: '1', card: cards.CARD_HEART_ACE},
                    {playerId: '2', card: cards.CARD_HEART_9}
                ]);
            });

            it('should raise error with wrong suit', () => {
                expect(() => {
                    round.createStep({
                        playerId: '2',
                        card: cards.CARD_SPADE_KING
                    });
                }).toThrowError(ROUND_STEP_CARD_INCORRECT);
            });
        });
    });

    describe('create defense step with jack spade as attack card', () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_HEART_7,
                players: [
                    {
                        id: '1',
                        cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE]
                    },
                    {
                        id: '2',
                        cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9]
                    },
                    {
                        id: '3',
                        cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_10, cards.CARD_CLUB_9]
                    }
                ],
                currentOrder: 0,
                cardsCount: 3
            });

            createPredictions({
                '1': 2,
                '2': 0,
                '3': 0
            });

            round.createStep({
                playerId: '1',
                card: cards.CARD_SPADE_JACK
            });
        });

        it('should allow the greatest card', () => {
            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_10
            });

            const statistic = round.getStatistic();

            expect(statistic.currentOrder).toBe(2);
            expect(statistic.currentStepStore).toEqual([
                {playerId: '1', card: cards.CARD_SPADE_JACK},
                {playerId: '2', card: cards.CARD_HEART_10}
            ]);
        });

        it('shouldn\'t allow not trump greatest card', () => {
            expect(() => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_HEART_9
                });
            }).toThrowError(ROUND_STEP_CARD_INCORRECT);

            expect(() => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_SPADE_KING
                });
            }).toThrowError(ROUND_STEP_CARD_INCORRECT);

            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_10
            });

            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_10
            });

            const statistic = round.getStatistic();

            expect(statistic.currentOrder).toBe(0);
            expect(statistic.players[0].points).toBe(1);
            expect(statistic.players[1].points).toBe(0);
            expect(statistic.players[2].points).toBe(0);
        });
    });

    describe('create defense step with trump as attack card', () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_HEART_7,
                players: [
                    {
                        id: '1',
                        cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE]
                    },
                    {
                        id: '2',
                        cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9]
                    },
                    {
                        id: '3',
                        cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_10, cards.CARD_CLUB_9]
                    }
                ],
                currentOrder: 0,
                cardsCount: 3
            });

            createPredictions({
                '1': 2,
                '2': 0,
                '3': 0
            });

            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_QUEEN
            });
        });

        it('should allow correct suit card', () => {
            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_10
            });

            let statistic = round.getStatistic();

            expect(statistic.currentOrder).toBe(2);
            expect(statistic.currentStepStore).toEqual([
                {playerId: '1', card: cards.CARD_HEART_QUEEN},
                {playerId: '2', card: cards.CARD_HEART_10}
            ]);

            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_KING
            });

            statistic = round.getStatistic();

            expect(statistic.currentOrder).toBe(0);
            expect(round.status).toBe(ROUND_STATUS_READY);
            expect(statistic.players[0].points).toBe(1);
            expect(statistic.players[1].points).toBe(0);
            expect(statistic.players[2].points).toBe(0);
        });
    });

    describe('full round', () => {
        beforeEach(() => {
            round = new Round({
                trumpCard: cards.CARD_HEART_7,
                players: [
                    {
                        id: '1',
                        cards: [cards.CARD_SPADE_JACK, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE]
                    },
                    {
                        id: '2',
                        cards: [cards.CARD_SPADE_KING, cards.CARD_HEART_10, cards.CARD_HEART_9]
                    },
                    {
                        id: '3',
                        cards: [cards.CARD_CLUB_KING, cards.CARD_CLUB_10, cards.CARD_CLUB_9]
                    }
                ],
                currentOrder: 2,
                cardsCount: 3
            });

            createPredictions({
                '1': 2,
                '2': 0,
                '3': 0
            });
        });

        it('should work all round with correct steps', () => {
            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_10
            });

            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_QUEEN
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_SPADE_KING
            });

            // Player: 1 won
            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_ACE
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_9
            });

            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_KING
            });

            // 'Player 1' won
            round.createStep({
                playerId: '1',
                card: cards.CARD_SPADE_JACK
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_HEART_10
            });

            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_9
            });

            const statistic = round.getStatistic();

            expect(statistic.players[0].points).toBe(3);
            expect(statistic.players[1].points).toBe(0);
            expect(statistic.players[2].points).toBe(0);
        });

        it('shouldn\'t allow use old cards', () => {
            round.createStep({
                playerId: '3',
                card: cards.CARD_CLUB_10
            });

            round.createStep({
                playerId: '1',
                card: cards.CARD_HEART_QUEEN
            });

            round.createStep({
                playerId: '2',
                card: cards.CARD_SPADE_KING
            });

            // 'Player 1' won
            expect(() => {
                round.createStep({
                    playerId: '1',
                    card: cards.CARD_HEART_QUEEN
                });
            }).toThrowError(ROUND_STEP_CARD_NOT_EXIST);

            expect(() => {
                round.createStep({
                    playerId: '2',
                    card: cards.CARD_SPADE_KING
                });
            }).toThrowError(WRONG_PLAYER_ORDER);
        });
    });
});
