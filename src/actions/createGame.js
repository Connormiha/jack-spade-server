// @flow

import games from 'games';
import Game from 'game';

let id: number = 0;

const createGame = (): Game => {
    id++;

    const game: Game = new Game({id});

    games.addGame(game);

    return game;
};

export default createGame;
