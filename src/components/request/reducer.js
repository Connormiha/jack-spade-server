// @flow

import setPrediciton from 'api/game/setPrediction';
import addPlayer from 'api/game/addPlayer';
import createGame from 'api/game/create';
import deleteGame from 'api/game/delete';
import createUser from 'api/user/create';
import deleteUser from 'api/user/delete';
import type {TypeBody, TypeResult} from 'components/request/types';

const reducers = {
    SET_PREDICTION: setPrediciton,
    ADD_PLAYER: addPlayer,
    CREATE_GAME: createGame,
    DELETE_GAME: deleteGame,
    CREATE_USER: createUser,
    DELETE_USER: deleteUser,
};

const reducer = (body: TypeBody, type: string): TypeResult => {
    if (typeof reducers[type] !== 'function') {
        return {status: 400};
    }

    return reducers[type](body);
};

export default reducer;
