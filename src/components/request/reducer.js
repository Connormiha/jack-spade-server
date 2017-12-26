// @flow

import setPrediciton from 'api/game/setPrediction';
import addPlayer from 'api/game/addPlayer';
import createGame from 'api/game/create';
import deleteGame from 'api/game/delete';
import type {TypeBody, TypeResult} from 'components/request/types';

const reducers = {
    SET_PREDICTION: setPrediciton,
    ADD_PLAYER: addPlayer,
    CREATE_GAME: createGame,
    DELETE_GAME: deleteGame,
};

const reducer = (body: TypeBody, res: express$Response, type: string) => {
    if (typeof reducers[type] !== 'function') {
        res.status(400);
        res.end();
        return;
    }

    const result: TypeResult = reducers[type](body);

    res.status(result.status);

    if (result.message) {
        res.json(result.message);
    } else {
        res.end();
    }
};

export default reducer;
