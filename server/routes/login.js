const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ email: "Identifiants incorrects" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(422).json({ email: "Identifiants incorrects" });
    }
    const token = jwt.sign({ sub: user._id }, "strongSecret", {
      expiresIn: "90 days",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
  }
});


module.exports = router;
