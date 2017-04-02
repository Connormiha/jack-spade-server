// @flow

import type Game from 'game';

export class Games {
    _games: Map<number, any>;

    constructor() {
        this._games = new Map();
    }

    addGame(game: Game) {
        this._games.set(game.id, game);
    }

    deleteGame(id: number): boolean {
        const hasGame = this._games.has(id);

        this._games.delete(id);

        return hasGame;
    }

    getGamesCount(): number {
        return this._games.size;
    }
}

export default new Games();
