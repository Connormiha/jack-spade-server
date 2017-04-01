// @flow

import games from 'games';

const deleteGame = (id: number): any => {
    const success = games.deleteGame(id);

    return {
        success
    };
};

export default deleteGame;
