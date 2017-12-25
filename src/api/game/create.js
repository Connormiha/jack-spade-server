// @flow

import createGame from 'actions/games/createGame';

const callback = (req: express$Request, res: express$Response): void => {
    const game = createGame();

    res.json({
        id: game.id,
    });
};

export default callback;
