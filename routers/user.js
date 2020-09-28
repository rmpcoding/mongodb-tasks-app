const express = require('express');
const router = express.Router();
const User = require('../models/User')

/* ---------------------------------- POST ---------------------------------- */

router.post('/users', async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
      await user.save();
      res.status(201).send(user);
  } catch (err) {
      res.status(400).send(err);
  }
});

/* ---------------------------------- READ ---------------------------------- */

router.get('/users', async (req, res) => {
  try {
      const users = await User.find({});
      res.send(users);
  } catch {
      res.status(500).send(err);
  }
});

/* ---------------------------------- READ ID ------------------------------- */

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
      const user = await User.findById(_id);

      if (!user) {
          return res.status(404).send();
      }
      res.send(user);
  } catch (err) {
      res.status(500).send();
  }
});

/* --------------------------------- UPDATE --------------------------------- */

router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const updatedUser = req.body;

  const updates = Object.keys(updatedUser)
  const allowedUpdates = ["name", "age", "email", "password"];

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      const user = await User.findByIdAndUpdate(_id, updatedUser, {
          new: true,
          runValidators: true,
      });
      if (!user) {
          return res.status(404).send();
      }
      res.send(user)
  } catch (err) {
      res.status(400).send(err)
  }
});

/* --------------------------------- DELETE --------------------------------- */

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
      const user = await User.findByIdAndDelete(_id);
      if (!user) {
          return res.status(404).send();
      }
      res.send(user);
  } catch (err) {
      res.status(404).send(err);
  }
});

module.exports = router;