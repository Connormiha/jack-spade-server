// @flow

import deleteGame from 'actions/games/deleteGame';
import type {TypeResult} from 'components/request/types';

type TypeBody = {
    id: string,
};

const callback = (body: TypeBody): TypeResult => {
    const result = deleteGame(body.id);

    return {
        status: result.success ? 204 : 400,
    };
};

export default callback;
