// @flow

import games from 'games';

const deleteGame = (id: string): any => {
    const success = games.delete(id);

    return {
        success
    };
};

export default deleteGame;
