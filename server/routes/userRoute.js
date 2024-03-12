const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const checkAuth = require('../middlewares/checkAuth');
const jwt = require("jsonwebtoken");
const isAdmin = require('../middlewares/isAdmin');
const router = new Router();

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/users", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, 
      role: req.body.role
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

router.get('/users/:id', checkAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.delete('/users/:id', checkAuth, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
