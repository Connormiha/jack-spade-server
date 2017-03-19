import Games from 'games';
import Game from 'game';

let id = 0;

const games = new Games();

const createGame = () => {
    id++;

    const game = new Game({id});

    games.addGame(game);

    return game;
};

export default createGame;
