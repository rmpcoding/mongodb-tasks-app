const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
// const { update } = require('../models/User');

/* ---------------------------------- POST ---------------------------------- */

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).send({
            user,
            token,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/* --------------------------------- LOGIN ---------------------------------- */

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();

        res.send({
            user,
            token,
        });
    } catch {
        res.status(400).send();
    }
});

/* --------------------------------- LOGOUT --------------------------------- */

router.post('/users/logout', auth, async (req, res) => {
    const user = req.user;

    try {
        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await user.save();

        res.send();
    } catch (err) {
        res.status(500).send();
    }
});

/* --------------------------------- LOGOUT ALL ----------------------------- */

router.post('/users/logoutAll', auth, async (req, res) => {
    const user = req.user;

    try {
        user.tokens = [];

        await user.save();

        res.send();
    } catch (err) {
        res.status(500).send();
    }
});

/* ---------------------------------- READ ---------------------------------- */

router.get('/users/me', auth, async (req, res) => {
    user = req.user;

    res.send(user);
});

/* --------------------------------- UPDATE --------------------------------- */

router.patch('/users/me', auth, async (req, res) => {
    const user = req.user;
    const updatedUser = req.body;

    const updates = Object.keys(updatedUser);
    const allowedUpdates = ['name', 'age', 'email', 'password'];

    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => (user[update] = updatedUser[update]));

        await user.save();

        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

/* --------------------------------- DELETE --------------------------------- */

router.delete('/users/me', auth, async (req, res) => {
    const user = req.user;
    const _id = user._id;

    try {
        await user.remove();
        res.send(user);
    } catch (err) {
        res.status(404).send(err);
    }
});

module.exports = router;
