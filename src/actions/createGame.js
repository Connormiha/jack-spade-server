// @flow

import games from 'games';
import Game from 'game';

let id: number = 0;

const createGame = (): Game => {
    id++;

    const game: Game = new Game({id: String(id)});

    games.add(game);

    return game;
};

export default createGame;
