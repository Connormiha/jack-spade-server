// @flow

import type {Card} from 'card';

export type RoundPlayer = {
    cards: Array<Card>,
    id: string
};

type RoundPlayerInner = RoundPlayer & {
    count: number
};

export type RoundInitialParams = {|
    trumpCard: Card,
    players: Array<RoundPlayer>,
    currentOrder: number
|};

class Round {
    _trumpCard: Card;
    _players: Array<RoundPlayerInner>;
    _currentOrder: number;

    constructor({trumpCard, players, currentOrder}: RoundInitialParams) {
        this._trumpCard = trumpCard;
        this._players = players.map(({id, cards}) => ({
            id, cards, count: 0
        }));

        this._currentOrder = currentOrder;
    }
}

export default Round;
