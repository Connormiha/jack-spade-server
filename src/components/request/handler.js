// @flow

import reducer from 'components/request/reducer';
import type {TypeResult, TypeBody} from 'components/request/types';
import type {IncomingMessage, ServerResponse} from 'http';
import {API_URLS} from 'components/request/urls';
import url from 'url';

export const DEFAULT_RESPONSE_HEADERS = {
    'Content-Type': 'application/json',
};

const onBodyReady = (httpBody: any[], res: ServerResponse, type: string) => {
    const body = Buffer.concat(httpBody).toString();
    let jsonBody: TypeBody;

    try {
        jsonBody = JSON.parse(body);
    } catch (e) {
        return;
    }

    const result: TypeResult = reducer(jsonBody, type);

    res.writeHead(result.status, DEFAULT_RESPONSE_HEADERS);

    if (result.message) {
        res.end(JSON.stringify(result.message));
    } else {
        res.end();
    }
};

const handler = (req: IncomingMessage, res: ServerResponse) => {
    const {method} = req;
    const pathname = url.parse(req.url).pathname || '';
    const apiPath = pathname.replace('/api/', '');

    if (!API_URLS[method] || !API_URLS[method][apiPath]) {
        res.end();
        return;
    }

    const httpBody = [];

    req
        .on('data', (chunk) => {
            httpBody.push(chunk);
        })
        .on('end', () => {
            onBodyReady(httpBody, res, API_URLS[method][apiPath]);
        });
};

export default handler;
