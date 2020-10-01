const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

/* ---------------------------------- POST ---------------------------------- */

router.post('/tasks', auth, async (req, res) => {
    const user = req.user;

    const task = new Task({
        ...req.body,
        owner: user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});

/* ---------------------------------- READ ---------------------------------- */

router.get('/tasks', auth, async (req, res) => {
    const user = req.user;

    try {
        const tasks = await Task.find({ owner: user._id});
        res.send(tasks);
    } catch {
        res.status(500).send(err);
    }
});

/* ---------------------------------- READ ID ------------------------------- */

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const user = req.user;

    try {
        const task = await Task.findOne({ 
            _id,
            owner: user._id
        });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (err) {
        res.status(500).send();
    }
});

/* --------------------------------- UPDATE --------------------------------- */

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updatedTask = req.body;
    const user = req.user;

    const updates = Object.keys(updatedTask);
    const allowedUpdates = ['completed', 'description'];

    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    

    try {
        const task = await Task.findOne({
            _id,
            owner: user._id
        });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => (task[update] = updatedTask[update]));
        await task.save();

        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});

/* --------------------------------- DELETE --------------------------------- */

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const user = req.user;

    try {
        const task = await Task.findOneAndDelete({
            _id,
            owner: user._id
        });

        if (!task) {
            return res.status(404).send();
        }
        
        res.send(task);
    } catch (err) {
        res.status(404).send(err);
    }
});

module.exports = router;
