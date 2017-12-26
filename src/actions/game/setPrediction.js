// @flow

import games from 'components/games';
import {GAME_NOT_FOUND} from 'errors';

import type Game from 'components/game';
import type {PredictionCount} from 'components/player';

export type TypeActionSetPrediction = {|
    gameId: string,
    roundId: number,
    playerId: string,
    count: PredictionCount,
|};

const setPrediction = ({gameId, roundId, playerId, count}: TypeActionSetPrediction) => {
    const game: Game | void = games.get(gameId);

    if (!game) {
        throw new Error(GAME_NOT_FOUND);
    }

    game.setPrediction({roundId, playerId, count});
};

export default setPrediction;
