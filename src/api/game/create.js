import createGame from 'actions/createGame';

const callback = (req, res) => {
    const game = createGame();

    res.json({
        id: game.id
    });
};

export default callback;
