// @flow

import Player from 'components/player';
import * as cards from 'components/card';

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

    it('should work deleteCard', ()=> {
        const player = new Player({id: '1'});

        player.addCard(cards.CARD_SPADE_10);

        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(true);

        player.deleteCard(cards.CARD_SPADE_QUEEN);
        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(true);

        player.deleteCard(cards.CARD_SPADE_10);

        expect(player.getCountCards()).toBe(0);
        expect(player.hasCard(cards.CARD_SPADE_10)).toBe(false);
    });

    it('should work getAllCards', ()=> {
        const player = new Player({id: '1'});

        player.addCard(cards.CARD_SPADE_10);
        expect(player.getAllCards().size).toBe(1);

        player.addCard(cards.CARD_SPADE_QUEEN);
        expect(player.getAllCards().size).toBe(2);
    });
});
