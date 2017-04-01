// @flow

import createUser from 'actions/createUser';

const callback = (req: express$Request, res: express$Response): void => {
    const user = createUser();

    res.json({
        id: user.id
    });
};

export default callback;
