// @flow

import type {Card} from 'card';
import {
    CARD_DECK, CARD_SPADE_JACK,
    CARD_SUIT_SPADE, CARD_SUIT_CLUB, CARD_SUIT_HEART, CARD_SUIT_DIAMOND,
    CARD_DESK_SPADE, CARD_DESK_CLUB, CARD_DESK_HEART, CARD_DESK_DIAMOND
} from 'card';

const SUITS_DESK = {
    [CARD_SUIT_SPADE]: CARD_DESK_SPADE,
    [CARD_SUIT_CLUB]: CARD_DESK_CLUB,
    [CARD_SUIT_HEART]: CARD_DESK_HEART,
    [CARD_SUIT_DIAMOND]: CARD_DESK_DIAMOND
};

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

export const getStrongestCard = (desk: Array<Card>, trumpCard: Card): Card | void => {
    let maxPoint: number = -1,
        maxCard: Card;

    for (const item of desk) {
        if (item === CARD_SPADE_JACK) {
            return item;
        }

        let currentPoint = SUITS_DESK[item.suit].indexOf(item);

        if (item.suit === trumpCard.suit) {
            currentPoint += 20;
        }

        if (maxPoint < currentPoint) {
            maxPoint = currentPoint;
            maxCard = item;
        }
    }

    return maxCard;
};
