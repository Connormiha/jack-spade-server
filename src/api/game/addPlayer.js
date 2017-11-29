// @flow
import addPlayer from 'actions/addPlayer';

const callback = (req: express$Request, res: express$Response): void => {
    const body: any = req.body;
    let player;

    try {
        player = addPlayer(body.gameId);
    } catch (e) {
        res.status(400);
        res.json({error: e.message});
        return;
    }

    res.json({
        id: player.id,
    });
};

export default callback;
