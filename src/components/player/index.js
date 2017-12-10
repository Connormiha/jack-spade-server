// @flow

import {ERROR_PLAYER_CARD_EXIST, ERROR_PLAYER_CARD_NOT_EXIST} from 'errors';
import type {Card} from 'components/card';

type TypeInitParams = {id: string};
export type PredictionCount = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TypePlayerStoreSnapshot = {|
    id: string,
    cards: Array<Card>,
    points: number,
    roundWinsCount: number,
    roundPrediction: PredictionCount,
    isRoundVoted: boolean,
|};

class Player {
    _id: string;
    _cards: Set<Card>;
    roundWinsCount: number;
    roundPrediction: PredictionCount;
    isRoundVoted: boolean;
    points: number;

    constructor(params?: TypeInitParams) {
        if (params) {
            this._create(params);
        }
    }

    _create({id}: TypeInitParams) {
        this._id = id;
        this.points = 0;
        this._cards = new Set();
        this.roundWinsCount = 0;
        this.roundPrediction = 0;
        this.isRoundVoted = false;
    }

    getSnapshot(): TypePlayerStoreSnapshot {
        return {
            id: this._id,
            cards: this.getAllCards(),
            points: this.points,
            roundWinsCount: this.roundWinsCount,
            roundPrediction: this.roundPrediction,
            isRoundVoted: this.isRoundVoted,
        };
    }

    restore(params: TypePlayerStoreSnapshot): Player {
        this._id = params.id;
        this._cards = new Set(params.cards);
        this.points = params.points;
        this.roundWinsCount = params.roundWinsCount;
        this.roundPrediction = params.roundPrediction;
        this.isRoundVoted = params.isRoundVoted;

        return this;
    }

    addCard(card: Card) {
        if (this.hasCard(card)) {
            throw new Error(ERROR_PLAYER_CARD_EXIST);
        }

        this._cards.add(card);
    }

    deleteCard(card: Card) {
        if (!this._cards.has(card)) {
            throw new Error(ERROR_PLAYER_CARD_NOT_EXIST);
        }

        this._cards.delete(card);
    }

    hasCard(card: Card): boolean {
        return this._cards.has(card);
    }

    clearCards() {
        this._cards.clear();
    }

    fillCards(cards: Card[]) {
        this.clearCards();

        for (const card of cards) {
            this.addCard(card);
        }
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
