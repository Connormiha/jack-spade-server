// @flow

import type {Card} from 'components/card';
import {
    CARD_DECK, CARD_SPADE_JACK,
    CARD_DESK_SPADE, CARD_DESK_CLUB, CARD_DESK_HEART, CARD_DESK_DIAMOND,
} from 'components/card';

const SUITS_DESK = {
    SUIT_SPADE: CARD_DESK_SPADE,
    SUIT_CLUB: CARD_DESK_CLUB,
    SUIT_HEART: CARD_DESK_HEART,
    SUIT_DIAMOND: CARD_DESK_DIAMOND,
};

export const getRandomCards = (count: number, except: Array<Card> = []): Array<Card> => {
    const result: Array<Card> = [];
    const cardDesk: Array<Card> = CARD_DECK.filter((item) => !except.includes(item));

    for (let i = 0; i < count; i++) {
        const index = parseInt(Math.random() * (count - 1 - i), 10);

        result.push(cardDesk[index]);
        cardDesk[index] = cardDesk[cardDesk.length - i - 1];
    }

    return result;
};

export const isCardBigger = (cardOne: Card, cardTwo: Card, cardTrump: Card): boolean => {
    if (cardOne === CARD_SPADE_JACK) {
        return true;
    }

    if (cardTwo === CARD_SPADE_JACK) {
        return false;
    }

    if (cardOne.suit === cardTwo.suit) {
        const value1 = SUITS_DESK[cardOne.suit].indexOf(cardOne);
        const value2 = SUITS_DESK[cardOne.suit].indexOf(cardTwo);

        return value1 > value2;
    }

    if (cardTwo.suit === cardTrump.suit) {
        return false;
    }

    return true;
};

export const getStrongestCard = (desk: Array<Card>, trumpCard: Card): Card => {
    let maxCard: Card = desk[0];

    for (const item of desk) {
        maxCard = isCardBigger(maxCard, item, trumpCard) ? maxCard : item;
    }

    return maxCard;
};
