// @flow

import {getRandomCards} from 'utils/generators';
import uniq from 'lodash/uniq';

import type {Card} from 'card';

describe('Utils/generators', () => {
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
});
