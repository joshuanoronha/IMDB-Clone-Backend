const mongoose = require('mongoose');
const { dbConnection } = require('../config/config');

mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const { connection } = mongoose;
connection.on('connected', () => {
  console.info('Database is connected successfully!');
});
connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
  connection,
  mongoose,
};
