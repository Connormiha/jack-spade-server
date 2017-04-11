// @flow

import games from 'games';
import Player from 'Player';
import {GAME_NOT_FOUND} from 'errors';

import type Game from 'game';

let id: number = 0;

const addPlayer = (gameId: string): Player => {
    id++;

    const game: Game | void = games.get(gameId);

    if (!game) {
        throw new Error({name: GAME_NOT_FOUND});
    }

    const player: Player = new Player({id: String(id)});

    game.join(player);

    return player;
};

export default addPlayer;
