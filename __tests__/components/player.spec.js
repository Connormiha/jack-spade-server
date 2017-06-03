// @flow

import Player from 'components/player';
import * as cards from 'components/card';
import {ERROR_PLAYER_CARD_EXIST, ERROR_PLAYER_CARD_NOT_EXIST} from 'errors';

describe('Player (class)', () => {
    it('should have instance', ()=> {
        const player = new Player({id: '1'});

        expect(player).toBeInstanceOf(Player);
        expect(player.id).toBe('1');
    });

    it('should work addCard', ()=> {
        const player = new Player({id: '1'});

        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(false);

        player.addCard(cards.CARD_SPADE_10);

        expect(player.getCountCards()).toBe(1);
        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(true);

        player.addCard(cards.CARD_SPADE_QUEEN);

        expect(player.getCountCards()).toBe(2);
        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(true);
        expect(player.hasCard(cards.CARD_SPADE_QUEEN)).toBe(true);
    });

    it('should throw error on add exist card', ()=> {
        const player = new Player({id: '1'});

        player.addCard(cards.CARD_SPADE_10);

        expect(() => {
            player.addCard(cards.CARD_SPADE_10);
        }).toThrowError(ERROR_PLAYER_CARD_EXIST);
    });

    it('should work deleteCard', ()=> {
        const player = new Player({id: '1'});

        player.addCard(cards.CARD_SPADE_10);

        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(true);

        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(true);

        player.deleteCard(cards.CARD_SPADE_10);

        expect(player.getCountCards()).toBe(0);
        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(false);
    });

    it('should throw error on delete unexist card', ()=> {
        const player = new Player({id: '1'});

        expect(() => {
            player.deleteCard(cards.CARD_SPADE_10);
        }).toThrowError(ERROR_PLAYER_CARD_NOT_EXIST);

        expect(player.getCountCards()).toBe(0);

        player.addCard(cards.CARD_SPADE_JACK);

        expect(() => {
            player.deleteCard(cards.CARD_SPADE_10);
        }).toThrowError(ERROR_PLAYER_CARD_NOT_EXIST);

        expect(player.getCountCards()).toBe(1);
    });

    it('should work getAllCards', ()=> {
        const player = new Player({id: '1'});

        player.addCard(cards.CARD_SPADE_10);
        expect(player.getAllCards()).toEqual([cards.CARD_SPADE_10]);

        player.addCard(cards.CARD_SPADE_QUEEN);
        expect(player.getAllCards()).toEqual([cards.CARD_SPADE_10, cards.CARD_SPADE_QUEEN]);
    });

    it('should work getSnapshot', () => {
        const player = new Player({id: '1'});

        player.addCard(cards.CARD_SPADE_10);
        player.addCard(cards.CARD_SPADE_QUEEN);

        const snapshot = player.getSnapshot();

        expect(snapshot.id).toBe(player.id);
        expect(snapshot.cards).toEqual([
            cards.CARD_SPADE_10,
            cards.CARD_SPADE_QUEEN
        ]);
    });

    it('should restore snapshot', () => {
        const player = new Player({id: '1'});

        player.addCard(cards.CARD_SPADE_10);
        player.addCard(cards.CARD_SPADE_QUEEN);

        const snapshot = player.getSnapshot();
        const player2 = new Player();

        player2.restore(snapshot);

        expect(player2.id).toBe(player.id);
        expect(player2.getAllCards()).toEqual([
            cards.CARD_SPADE_10,
            cards.CARD_SPADE_QUEEN
        ]);
    });
});
