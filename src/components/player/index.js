// @flow

import type {Card} from 'components/card';

type init_params = {id: string};

class Player {
    _id: string;
    _cards: Set<Card>;

    constructor({id}: init_params) {
        this._id = id;
        this._cards = new Set();
    }

    addCard(card: any): void {
        this._cards.add(card);
    }

    deleteCard(card: any): void {
        this._cards.delete(card);
    }

    hasCard(card: any): boolean {
        return this._cards.has(card);
    }

    getAllCards(): any {
        return this._cards;
    }

    getCountCards(): number {
        return this._cards.size;
    }

    get id(): string {
        return this._id;
    }
}

export default Player;
