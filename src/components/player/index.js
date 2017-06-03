// @flow

import {ERROR_PLAYER_CARD_EXIST, ERROR_PLAYER_CARD_NOT_EXIST} from 'errors';
import type {Card} from 'components/card';

type init_params = {id: string};

export type TypePlayerStoreSnapshot = {|
    id: string,
    cards: Array<Card>
|};

class Player {
    _id: string;
    _cards: Set<Card>;

    constructor(params?: init_params) {
        if (params) {
            this._create(params);
        }
    }

    _create({id}: init_params) {
        this._id = id;
        this._cards = new Set();
    }

    getSnapshot(): TypePlayerStoreSnapshot {
        return {
            id: this._id,
            cards: this.getAllCards()
        };
    }

    restore(params: TypePlayerStoreSnapshot) {
        this._id = params.id;
        this._cards = new Set(params.cards);
    }

    addCard(card: any): void {
        if (this._cards.has(card)) {
            throw new Error(ERROR_PLAYER_CARD_EXIST);
        }

        this._cards.add(card);
    }

    deleteCard(card: any): void {
        if (!this._cards.has(card)) {
            throw new Error(ERROR_PLAYER_CARD_NOT_EXIST);
        }

        this._cards.delete(card);
    }

    hasCard(card: any): boolean {
        return this._cards.has(card);
    }

    getAllCards(): Array<Card> {
        return Array.from(this._cards);
    }

    getCountCards(): number {
        return this._cards.size;
    }

    get id(): string {
        return this._id;
    }
}

export default Player;
