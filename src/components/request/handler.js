// @flow

import reducer from 'components/request/reducer';
import type {TypeResult, TypeBody} from 'components/request/types';
import type {IncomingMessage, ServerResponse} from 'http';

const onBodyReady = (httpBody: any[], res: ServerResponse) => {
    const body = Buffer.concat(httpBody).toString();
    let jsonBody: TypeBody;

    try {
        jsonBody = JSON.parse(body);
    } catch (e) {
        return;
    }

    const result: TypeResult = reducer(jsonBody, jsonBody.type);

    res.writeHead(result.status, {
        'Content-Type': 'application/json',
    });

    if (result.message) {
        res.end(JSON.stringify(result.message));
    } else {
        res.end();
    }
};

const handler = (req: IncomingMessage, res: ServerResponse) => {
    const httpBody = [];

    res
        .on('data', (chunk) => {
            httpBody.push(chunk);
        })
        .on('end', () => {
            onBodyReady(httpBody, res);
        });
};

export default handler;
