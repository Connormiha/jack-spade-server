// @flow

import type Game from 'game';

export class Games {
    _games: Map<number, Game>;

    constructor() {
        this._games = new Map();
    }

    add(game: Game): void {
        this._games.set(game.id, game);
    }

    delete(id: number): boolean {
        const hasGame = this._games.has(id);

        this._games.delete(id);

        return hasGame;
    }

    clear(): void {
        this._games = new Map();
    }

    get(id: number): Game | void {
        return this._games.get(id);
    }

    get count(): number {
        return this._games.size;
    }
}

export default new Games();
