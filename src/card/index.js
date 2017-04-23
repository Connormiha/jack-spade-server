// @flow

export const CARD_SUIT_SPADE = 'SUIT_SPADE';
export const CARD_SUIT_CLUB = 'SUIT_CLUB';
export const CARD_SUIT_HEART = 'SUIT_HEART';
export const CARD_SUIT_DIAMOND = 'SUIT_DIAMOND';

export const CARD_VALUE_6 = 'CARD_VALUE_6';
export const CARD_VALUE_7 = 'CARD_VALUE_7';
export const CARD_VALUE_8 = 'CARD_VALUE_8';
export const CARD_VALUE_9 = 'CARD_VALUE_9';
export const CARD_VALUE_10 = 'CARD_VALUE_10';
export const CARD_VALUE_JADE = 'CARD_VALUE_JADE';
export const CARD_VALUE_QUEEN = 'CARD_VALUE_QUEEN';
export const CARD_VALUE_KING = 'CARD_VALUE_KING';
export const CARD_VALUE_ACE = 'CARD_VALUE_ACE';

export type CardSuit = 'SUIT_SPADE' | 'SUIT_CLUB' | 'SUIT_HEART' | 'SUIT_DIAMOND';
export type CardValue = 'CARD_VALUE_6' |
                        'CARD_VALUE_7' |
                        'CARD_VALUE_8' |
                        'CARD_VALUE_9' |
                        'CARD_VALUE_10' |
                        'CARD_VALUE_JADE' |
                        'CARD_VALUE_QUEEN' |
                        'CARD_VALUE_KING' |
                        'CARD_VALUE_ACE';

export type Card = {|
    +suit: CardSuit;
    +value: CardValue;
|};

export const CARD_SPADE_6: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_6};
export const CARD_SPADE_7: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_7};
export const CARD_SPADE_8: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_8};
export const CARD_SPADE_9: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_9};
export const CARD_SPADE_10: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_10};
export const CARD_SPADE_JADE: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_JADE};
export const CARD_SPADE_QUEEN: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_QUEEN};
export const CARD_SPADE_KING: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_KING};
export const CARD_SPADE_ACE: Card = {suit: CARD_SUIT_SPADE, value: CARD_VALUE_ACE};

export const CARD_CLUB_6: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_6};
export const CARD_CLUB_7: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_7};
export const CARD_CLUB_8: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_8};
export const CARD_CLUB_9: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_9};
export const CARD_CLUB_10: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_10};
export const CARD_CLUB_JADE: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_JADE};
export const CARD_CLUB_QUEEN: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_QUEEN};
export const CARD_CLUB_KING: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_KING};
export const CARD_CLUB_ACE: Card = {suit: CARD_SUIT_CLUB, value: CARD_VALUE_ACE};

export const CARD_HEART_6: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_6};
export const CARD_HEART_7: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_7};
export const CARD_HEART_8: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_8};
export const CARD_HEART_9: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_9};
export const CARD_HEART_10: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_10};
export const CARD_HEART_JADE: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_JADE};
export const CARD_HEART_QUEEN: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_QUEEN};
export const CARD_HEART_KING: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_KING};
export const CARD_HEART_ACE: Card = {suit: CARD_SUIT_HEART, value: CARD_VALUE_ACE};

export const CARD_DIAMOND_6: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_6};
export const CARD_DIAMOND_7: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_7};
export const CARD_DIAMOND_8: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_8};
export const CARD_DIAMOND_9: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_9};
export const CARD_DIAMOND_10: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_10};
export const CARD_DIAMOND_JADE: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_JADE};
export const CARD_DIAMOND_QUEEN: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_QUEEN};
export const CARD_DIAMOND_KING: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_KING};
export const CARD_DIAMOND_ACE: Card = {suit: CARD_SUIT_DIAMOND, value: CARD_VALUE_ACE};

export const CARD_DECK: Array<Card> = Object.freeze([
    CARD_SPADE_6, CARD_SPADE_7, CARD_SPADE_8, CARD_SPADE_9, CARD_SPADE_10,
    CARD_SPADE_JADE, CARD_SPADE_QUEEN, CARD_SPADE_KING, CARD_SPADE_ACE,

    CARD_CLUB_6, CARD_CLUB_7, CARD_CLUB_8, CARD_CLUB_9, CARD_CLUB_10,
    CARD_CLUB_JADE, CARD_CLUB_QUEEN, CARD_CLUB_KING, CARD_CLUB_ACE,

    CARD_HEART_6, CARD_HEART_7, CARD_HEART_8, CARD_HEART_9, CARD_HEART_10,
    CARD_HEART_JADE, CARD_HEART_QUEEN, CARD_HEART_KING, CARD_HEART_ACE,

    CARD_DIAMOND_6, CARD_DIAMOND_7, CARD_DIAMOND_8, CARD_DIAMOND_9, CARD_DIAMOND_10,
    CARD_DIAMOND_JADE, CARD_DIAMOND_QUEEN, CARD_DIAMOND_KING, CARD_DIAMOND_ACE
]);
