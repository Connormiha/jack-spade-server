export class Games {
    constructor() {
        this._games = new Map();
    }

    addGame(game) {
        this._games.set(game.id, game);
    }

    deleteGame(id) {
        const hasGame = this._games.has(id);

        this._games.delete(id);

        return hasGame;
    }

    getGamesCount() {
        return this._games.size;
    }
}

export default new Games();
