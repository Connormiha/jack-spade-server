// @flow

import createGame from 'actions/games/createGame';
import type {TypeResult} from 'components/request/types';

// @todo
// type TypeBody = {
//     [string]: any;
// };

const callback = (): TypeResult => {
    const game = createGame();

    return {
        status: 200,
        message: {
            id: game.id,
        },
    };
};

export default callback;
