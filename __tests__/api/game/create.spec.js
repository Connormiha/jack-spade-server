// @flow

import games from 'components/games';
import apiCreateGame from 'api/game/create';

describe('API game/create', () => {
    afterEach(() => {
        games.clear();
    });

    it('should create game', () => {
        const result = apiCreateGame();

        expect(result.status).toBe(200);
        expect(result.message.id).toBeTruthy();
        expect(games.count).toBe(1);
    });
});
