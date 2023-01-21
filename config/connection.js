//connect to database
const mongoose = require('mongoose');
//const { connect, connection } = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Export Connection
module.exports = mongoose.connection;