// @flow

import games from 'components/games';
import Game from 'components/game';

let id: number = 0;

const createGame = (): Game => {
    id++;

    const game: Game = new Game({id: String(id)});

    games.add(game);

    return game;
};

export default createGame;
