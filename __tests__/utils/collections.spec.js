// @flow

import {getRandomCards, getStrongestCard} from 'utils/collections';
import uniq from 'lodash/uniq';

import * as card from 'components/card';
import type {Card} from 'components/card';

describe('Utils/collections', () => {
    describe('getRandomCards', () => {
        it('should work getRandomCards', () => {
            const cards = getRandomCards(5);

            expect(cards.length).toBe(5);
            expect(uniq(cards).length).toBe(5);
        });

        it('should work getRandomCards with expect', () => {
            let cards: Array<Card> = [];

            for (let i = 0; i < 12; i++) {
                const randomCards = getRandomCards(3, cards);

                expect(randomCards.length).toBe(3);
                expect(uniq(randomCards).length).toBe(3);

                cards = cards.concat(randomCards);
            }

            expect(cards.length).toBe(36);
            expect(uniq(cards).length).toBe(36);
        });
    });

    describe('getStrongestCard', () => {
        it('should return jack spade', () => {
            expect(getStrongestCard(
                [card.CARD_SPADE_JACK, card.CARD_SPADE_10, card.CARD_HEART_10],
                card.CARD_DIAMOND_QUEEN
            )).toBe(card.CARD_SPADE_JACK);

            expect(getStrongestCard(
                [card.CARD_SPADE_10, card.CARD_HEART_10, card.CARD_SPADE_JACK],
                card.CARD_DIAMOND_QUEEN
            )).toBe(card.CARD_SPADE_JACK);

            expect(getStrongestCard(
                [card.CARD_SPADE_JACK],
                card.CARD_DIAMOND_QUEEN
            )).toBe(card.CARD_SPADE_JACK);
        });

        it('should return "heart 10"', () => {
            expect(getStrongestCard(
                [card.CARD_HEART_10, card.CARD_HEART_6],
                card.CARD_SPADE_QUEEN
            )).toBe(card.CARD_HEART_10);

            expect(getStrongestCard(
                [card.CARD_SPADE_10, card.CARD_HEART_10, card.CARD_SPADE_KING, card.CARD_HEART_6],
                card.CARD_HEART_QUEEN
            )).toBe(card.CARD_HEART_10);
        });
    });
});
