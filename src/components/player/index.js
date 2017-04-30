// @flow

type id_type = string;
type init_params = {id: id_type};

class Player {
    _id: id_type;
    _cards: Set<any>;

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

    get id(): id_type {
        return this._id;
    }
}

export default Player;
