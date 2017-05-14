// @flow

import Round from 'components/round';
import {
    ROUND_STATUS_NOT_READY, ROUND_STATUS_READY
} from 'components/round';
import * as cards from 'components/card';
import {
    PLAYER_ALREADY_PLACED_A_BET, ROUND_WRONG_PLAYER_CARDS_COUNT, WRONG_PLAYER_ORDER,
    ROUND_STEP_WRONG_STATUS
} from 'errors';

describe('Round (class)', () => {
    const mockInitialPlayers = [
        {
            id: '1',
            cards: [cards.CARD_SPADE_QUEEN, cards.CARD_HEART_QUEEN, cards.CARD_HEART_ACE]
        },
        {
            id: '2',
            cards: [cards.CARD_HEART_KING, cards.CARD_HEART_10, cards.CARD_HEART_9]
        },
        {
            id: '3',
            cards: [cards.CARD_HEART_6, cards.CARD_HEART_7, cards.CARD_HEART_8]
        }
    ];

    it('should have instance', () => {
        const round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers,
            currentOrder: 0,
            cardsCount: 3
        });

        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
    });

    it('should status to be ready after all players made prediction', () => {
        const round = new Round({
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
        const round = new Round({
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
        let round;

        const createPredictions = (predictions: any) => {
            for (const key in predictions) {
                if (predictions.hasOwnProperty(key)) {
                    round.seеPrediction(key, predictions[key]);
                }
            }
        };

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
                    card: cards.CARD_DIAMOND_10
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
                    card: cards.CARD_DIAMOND_10
                });
            }).toThrowError(WRONG_PLAYER_ORDER);

            expect(() => {
                round.createStep({
                    playerId: '20',
                    card: cards.CARD_DIAMOND_10
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
                card: cards.CARD_DIAMOND_10
            });

            const statistic = round.getStatistic();

            expect(statistic.currentOrder).toBe(1);
            expect(statistic.currentStepStore).toEqual([{playerId: '1', card: cards.CARD_DIAMOND_10}]);
        });
    });
});
