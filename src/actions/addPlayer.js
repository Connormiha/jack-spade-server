// @flow

import games from 'components/games';
import Player from 'components/player';
import {GAME_NOT_FOUND} from 'errors';

import type Game from 'components/game';

let id: number = 0;

const addPlayer = (gameId: string): Player => {
    id++;

    const game: Game | void = games.get(gameId);

    if (!game) {
        throw new Error(GAME_NOT_FOUND);
    }

    const player: Player = new Player({id: String(id)});

    game.joinPlayer(player);

    return player;
};

export default addPlayer;
