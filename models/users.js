const { mongoose } = require("../db/connection")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    userId: ObjectId,
    email: String,
    password: String
})

const Users = mongoose.model('User', userSchema);

module.exports = Users