// @flow

import deleteGame from 'actions/games/deleteGame';

const callback = (req: express$Request, res: express$Response): void => {
    const body: {id: string} = req.body;
    const result = deleteGame(body.id);

    if (result.success) {
        res.status(204);
    } else {
        res.status(400);
    }

    res.end();
};

export default callback;
