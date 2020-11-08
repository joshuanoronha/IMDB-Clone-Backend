const connection = require('./secrets/connection.js');

function fetchConnectionString(secretName) {
  if (connection[secretName]) return connection[secretName];
  throw new Error('Improper key sent to the function');
}

module.exports = {
  fetchConnectionString,
};
