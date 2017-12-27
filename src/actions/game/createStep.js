// @flow

import games from 'components/games';
import {GAME_NOT_FOUND, ERROR_INVALID_CARD} from 'errors';
import {CARD_DECK} from 'components/card';

import type Game from 'components/game';
import type {Card} from 'components/card';

type TypeCardAliases = {
    [value: string]: Card,
};

const cardsAliases: TypeCardAliases = CARD_DECK.reduce((acc: any, card: Card) => {
    const suit = card.suit.replace('CARD_SUIT_', '');
    const value = card.value.replace('CARD_VALUE_', '');

    acc[`${suit}_${value}`] = card;

    return acc;
}, {});

export type TypeBody = {|
    gameId: string,
    roundId: number,
    playerId: string,
    card: string,
|};

const createStep = ({gameId, roundId, playerId, card}: TypeBody) => {
    const realCard = cardsAliases[card];

    if (!realCard) {
        throw new Error(ERROR_INVALID_CARD);
    }

    const game: Game | void = games.get(gameId);

    if (!game) {
        throw new Error(GAME_NOT_FOUND);
    }

    game.createStep({roundId, playerId, card: realCard});
};

export default createStep;
