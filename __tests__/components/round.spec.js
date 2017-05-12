// @flow

import Round from 'components/round';
import {
    ROUND_STATUS_NOT_READY, ROUND_STATUS_READY
} from 'components/round';
import * as cards from 'components/card';
import {
    PLAYER_ALREADY_PLACED_A_BET
} from 'errors';

describe('Round (class)', () => {
    const mockInitialPlayers = [
        {
            id: '1',
            cards: [cards.CARD_SPADE_QUEEN, cards.CARD_HEART_QUEEN]
        },
        {
            id: '2',
            cards: [cards.CARD_HEART_KING, cards.CARD_HEART_10]
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
            currentOrder: 0
        });

        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
    });

    it('should status to be ready after all playes made prediction', () => {
        const round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers,
            currentOrder: 0
        });

        round.seеPrediction('1', 1);
        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
        round.seеPrediction('2', 1);
        expect(round.status).toBe(ROUND_STATUS_NOT_READY);
        round.seеPrediction('3', 1);

        expect(round.status).toBe(ROUND_STATUS_READY);
    });

    it('should raise error on re-prediction', () => {
        const round = new Round({
            trumpCard: cards.CARD_SPADE_10,
            players: mockInitialPlayers,
            currentOrder: 0
        });

        round.seеPrediction('1', 1);

        expect(() => round.seеPrediction('1', 1)).toThrowError(PLAYER_ALREADY_PLACED_A_BET);
    });
});
