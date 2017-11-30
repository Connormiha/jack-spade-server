// @flow

import Player from 'components/player';
import {fillPlayersCards} from 'utils/player';
import {sortCards} from 'utils/collections';
import * as card from 'components/card';

describe('Utils/player', () => {
    describe('fillPlayersCards', () => {
        let mock;
        let player1;
        let player2;

        beforeEach(() => {
            player1 = new Player({id: '1'});
            player2 = new Player({id: '2'});
            mock = {
                players: [player1, player2],
                cards: [
                    [card.CARD_SPADE_6, card.CARD_SPADE_7, card.CARD_SPADE_QUEEN],
                    [card.CARD_CLUB_6, card.CARD_CLUB_7, card.CARD_CLUB_QUEEN],
                ],
            };
        });

        it('should fill player with cards', () => {
            fillPlayersCards(mock);

            expect(
                sortCards(player1.getAllCards())
            ).toEqual(sortCards(mock.cards[0]));

            expect(
                sortCards(player2.getAllCards())
            ).toEqual(sortCards(mock.cards[1]));
        });

        it('should fill ready player with cards', () => {
            mock.players[0].addCard(card.CARD_CLUB_10);
            mock.players[0].addCard(card.CARD_CLUB_9);
            mock.players[1].addCard(card.CARD_SPADE_10);
            mock.players[1].addCard(card.CARD_SPADE_9);

            fillPlayersCards(mock);

            expect(
                sortCards(player1.getAllCards())
            ).toEqual(sortCards(mock.cards[0]));

            expect(
                sortCards(player2.getAllCards())
            ).toEqual(sortCards(mock.cards[1]));
        });
    });
});
