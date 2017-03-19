const createGame = require('actions/createGame');

const callback = (req, res) => {
    const game = createGame();

    res.json({
        id: game.id
    });
};

module.exports = callback;
