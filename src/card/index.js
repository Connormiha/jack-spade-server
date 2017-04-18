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

export type Card = {
    +suit: CardSuit;
    +value: CardValue;
};
