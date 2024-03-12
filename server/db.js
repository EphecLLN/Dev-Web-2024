const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/projet-football', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
