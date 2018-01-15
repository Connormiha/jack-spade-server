// @flow

import events from 'events';

import handler, {DEFAULT_RESPONSE_HEADERS} from 'components/request/handler';
import {anyObject} from 'mock/objects';
import games from 'components/games';
import Game from 'components/game';

import type {IncomingMessage, ServerResponse} from 'http';

describe('Request handler', () => {
    it('should success join player', () => {
        const game: Game = new Game({id: '1'});

        games.add(game);

        const writeHead = jest.fn();
        const end = jest.fn();
        const request: IncomingMessage = Object.assign(
            anyObject(new events.EventEmitter()),
            {method: 'POST', url: 'https://site.com/api/game/add_player'},
        );
        const response: ServerResponse = Object.assign(anyObject(), {writeHead, end});

        handler(request, response);

        request.emit(
            'data',
            Buffer.from(JSON.stringify({gameId: '1', type: 'ADD_PLAYER'}), 'utf8'),
        );

        request.emit('end');

        expect(writeHead).toHaveBeenCalledWith(200, DEFAULT_RESPONSE_HEADERS);
        expect(writeHead).toHaveBeenCalledTimes(1);
        expect(end).toHaveBeenCalledWith(
            JSON.stringify({
                id: game.getSnapshot().players[0].id,
            })
        );
        expect(end).toHaveBeenCalledTimes(1);
        expect(game.countMembers).toBe(1);
    });
});
