const connection = require('./secrets/connection.js');
const key = require('./secrets/keys');

function fetchConnectionString(secretName) {
  if (connection[secretName]) return connection[secretName];
  throw new Error('Improper key sent to the function');
}

function fetchKey(secretName) {
  if (key[secretName]) return key[secretName];
  throw new Error('Improper key sent to the function');
}

module.exports = {
  fetchConnectionString,
  fetchKey,
};
