class Games {
    constructor() {
        this._games = new Map();
    }

    addGame(game) {
        this._games.set(game.id, game);
    }

    deleteCard(game) {
        this._games.delete(game);
    }

    getGamesCount() {
        return this._games.size;
    }
}

module.exports = Games;
