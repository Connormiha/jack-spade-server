const Games = require('games');
const Game = require('game');

let id = 0;
const games = new Games();

const callback = (req, res) => {
    id++;
    const game = new Game({id});

    games.addGame(game);

    res.json({
        id
    });
};

module.exports = callback;
