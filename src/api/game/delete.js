import deleteGame from 'actions/deleteGame';

const callback = (req, res) => {
    deleteGame(req.body.id);
    res.status(204);
    res.end();
};

export default callback;
