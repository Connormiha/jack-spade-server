// @flow

import createUser from 'actions/createUser';
import type {TypeResult} from 'components/request/types';

const callback = (): TypeResult => {
    const user = createUser();

    return {
        status: 200,
        message: {
            id: user.id,
        },
    };
};

export default callback;
