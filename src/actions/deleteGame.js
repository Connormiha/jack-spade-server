// @flow

import games from 'components/games';

const deleteGame = (id: string): any => {
    const success = games.delete(id);

    return {
        success
    };
};

export default deleteGame;
