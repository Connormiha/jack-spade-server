// @flow

import deleteGame from 'actions/deleteGame';

declare class bodyparser$RequestBodyJson extends express$Request {
    body: any
}

const callback = (req: bodyparser$RequestBodyJson, res: express$Response): void => {
    const result = deleteGame(req.body.id);

    if (result.success) {
        res.status(204);
    } else {
        res.status(400);
    }

    res.end();
};

export default callback;
