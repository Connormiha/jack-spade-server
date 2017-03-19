class Gamer {
    constructor() {
        this._cards = new Set();
    }

    addCard(card) {
        this._cards.add(card);
    }

    deleteCard(card) {
        this._cards.delete(card);
    }

    hasCard(card) {
        return this._cards.has(card);
    }

    getAllCards() {
        return this._cards;
    }

    getCountCards() {
        return this._cards.size();
    }
}

module.exports = Gamer;
