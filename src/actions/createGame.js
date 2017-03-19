const Games = require('games');
const Game = require('game');

let id = 0;

const games = new Games();

const createGame = () => {
    id++;

    const game = new Game({id});

    games.addGame(game);

    return game;
};

module.exports = createGame;
