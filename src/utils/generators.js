// @flow

import type {Card} from 'card';
import {CARD_DECK} from 'card';

export const getRandomCards = (count: number, except: Array<Card> = []): Array<Card> => {
    const result: Array<Card> = [];
    const card_desk: Array<Card> = CARD_DECK.filter((item) => !except.includes(item));

    for (let i = 0; i < count; i++) {
        const index = parseInt(Math.random() * (count - 1 - i));

        result.push(card_desk[index]);
        card_desk[index] = card_desk[card_desk.length - i - 1];
    }

    return result;
};
