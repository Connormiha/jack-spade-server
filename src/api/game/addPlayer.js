// @flow

import addPlayer from 'actions/game/addPlayer';
import type {TypeResult} from 'components/request/types';

type TypeBodyAddPlayer = {
    gameId: string,
};

const callback = (body: TypeBodyAddPlayer): TypeResult => {
    let player;

    try {
        player = addPlayer(body.gameId);
    } catch (e) {
        return {
            message: {error: e.message},
            status: 400,
        };
    }

    return {
        message: {id: player.id},
        status: 200,
    };
};

export default callback;
