// @flow

import games from 'components/games';
import {GAME_NOT_FOUND} from 'errors';

import type Game from 'components/game';

type TypeActionSetPrediction = {|
    gameId: string,
    roundId: string,
    playerId: string,
    count: number,
|};

const setPrediction = ({gameId, roundId, playerId, count}: TypeActionSetPrediction) => {
    const game: Game | void = games.get(gameId);

    if (!game) {
        throw new Error(GAME_NOT_FOUND);
    }

    game.setPrediction({roundId, playerId, count});
};

export default setPrediction;
