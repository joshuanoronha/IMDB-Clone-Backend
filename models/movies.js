const { mongoose } = require("../db/connection")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const movieSchema = new Schema({
    movieId: ObjectId,
    '99popularity': Number,
    director: String,
    genre: Array,
    imdb_score: Number,
    name: {
        type: String,
        required: true
    }
});

const Movies = mongoose.model('Movie', movieSchema);

module.exports = Movies