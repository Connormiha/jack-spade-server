// @flow

import Player from 'components/player';
import type {Card} from 'components/card';

type TypeFillPlayersCards = {|
    players: Player[],
    cards: Card[][],
|};

export const fillPlayersCards = ({players, cards}: TypeFillPlayersCards): void => {
    players.forEach((item: Player, i: number) => {
        item.clearCards();

        cards[i].forEach((cardItem: Card) => {
            item.addCard(cardItem);
        });
    });
};
