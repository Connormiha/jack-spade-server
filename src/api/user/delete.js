// @flow

import deleteUser from 'actions/deleteUser';
import type {TypeResult} from 'components/request/types';

type TypeBody = {
    id: string,
};

const callback = (body: TypeBody): TypeResult => {
    const result = deleteUser(body.id);

    return {
        status: result.success ? 204 : 400,
    };
};

export default callback;
