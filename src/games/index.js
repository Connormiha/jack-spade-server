// @flow

import type Game from 'game';

export class Games {
    _games: Map<number, any>;

    constructor() {
        this._games = new Map();
    }

    add(game: Game) {
        this._games.set(game.id, game);
    }

    delete(id: number): boolean {
        const hasGame = this._games.has(id);

        this._games.delete(id);

        return hasGame;
    }

    clear() {
        this._games = new Map();
    }

    get count(): number {
        return this._games.size;
    }
}

export default new Games();
