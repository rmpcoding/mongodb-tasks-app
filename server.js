const express = require('express');
const User = require('./models/User');
const Task = require('./models/Task');
require('./db/mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------------------------------- POST ---------------------------------- */

app.post('/users', (req, res) => {
    console.log(req.body);
    const user = new User(req.body);

    user.save()
        .then(() => {
            res.status(201).send(user);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

/* ---------------------------------- READ ---------------------------------- */

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            res.status(500).send();
        });
});

/* ---------------------------------- READ ---------------------------------- */

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id)
        .then((task) => {
            if (!task) {
                return res.status(404).send();
            }
            res.send(task);
        })
        .catch((err) => {
            res.status(500).send();
        });
});

/* ---------------------------------- POST ---------------------------------- */

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save()
        .then(() => {
            res.status(201).send(task);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

app.listen(PORT, () => {
    console.log(`App is now listening on http://localhost:${PORT}`);
});
