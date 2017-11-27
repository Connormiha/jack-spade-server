// @flow

import Player from 'components/player';
import Card from 'components/card';

type TypeFillPlayersCards = {|
    players: Player[],
    cards: Card[][],
|};

export const fillPlayersCards = ({players, cards}: TypeFillPlayersCards): void => {
    players.forEach((item: Player, i: number) => {
        cards[i].forEach((cardItem: Card) => {
            item.addCard(cardItem);
        });
    });
};
