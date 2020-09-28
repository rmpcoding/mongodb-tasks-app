const express = require('express');
const User = require('./models/User');
const Task = require('./models/Task');
require('./db/mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- POST ---------------------------------- */

app.post('/users', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

/* -------------------------------------------------------------------------- */
/*                                    TASKS                                   */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- POST ---------------------------------- */

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});

/* ---------------------------------- READ ---------------------------------- */

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch {
        res.status(500).send(err);
    }
});

/* ---------------------------------- READ ---------------------------------- */

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (err) {
        res.status(500).send();
    }
});

/* --------------------------------- UPDATE --------------------------------- */

app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updatedTask = req.body;

    const updates = Object.keys(updatedTask)
    const allowedUpdates = ["completed", "description"];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, updatedTask, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (err) {
        res.status(400).send(err)
    }
});

/* --------------------------------- DELETE --------------------------------- */

app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (err) {
        res.status(404).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`App is now listening on http://localhost:${PORT}`);
});
