// @flow

import setPrediciton from 'actions/game/setPrediction';
import type {TypeActionSetPrediction} from 'actions/game/setPrediction';
import type {TypeResult} from 'components/request/types';

const callback = (body: TypeActionSetPrediction): TypeResult => {
    try {
        setPrediciton(body);
        return {status: 204};
    } catch (e) {
        return {status: 400};
    }
};

export default callback;
