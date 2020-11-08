const { mongoose } = require('../db/connection');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const movieSchema = new Schema({
  movieId: ObjectId,
  '99popularity': {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  genre: Array,
  imdb_score: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Movies = mongoose.model('Movie', movieSchema);

module.exports = Movies;
