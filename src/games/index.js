export class Games {
    constructor() {
        this._games = new Map();
    }

    addGame(game) {
        this._games.set(game.id, game);
    }

    deleteGame(id) {
        this._games.delete(id);
    }

    getGamesCount() {
        return this._games.size;
    }
}

export default new Games();
