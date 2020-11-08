const { mongoose } = require('../db/connection');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema({
  userId: ObjectId,
  email: String,
  password: String,
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
