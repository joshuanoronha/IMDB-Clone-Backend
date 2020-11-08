const bcrypt = require('bcrypt');
const { mongoose } = require('../db/connection');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema({
  userId: ObjectId,
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre(
  'save',
  async function (next) { // eslint-disable-line 
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  },
);

userSchema.methods.isValidPassword = async function (password) { // eslint-disable-line 
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const Users = mongoose.model('User', userSchema);

mongoose.model('Users', userSchema);

module.exports = Users;
