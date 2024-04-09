const jwt = require("jsonwebtoken");
const User = require('../models/user');

module.exports = async function checkAdmin(req, res, next) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId); 

    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).send({
        error: "Accès interdit aux non-administrateurs"
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
