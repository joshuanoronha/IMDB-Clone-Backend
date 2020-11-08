const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const auth = require('./services/auth');
const movie = require('./routes/movie');
const movies = require('./routes/movies');
const user = require('./routes/user');
const login = require('./routes/login');
const genres = require('./routes/genres');

auth.initializePassport();
app.use(cors());
app.use(bodyParser.json());
app.use('/movie', movie);
app.use('/movies', movies);
app.use('/login', login);
app.use('/user', user);
app.use('/genres', genres);

app.listen(PORT, () => {
  console.info(`Server is running at ${PORT}`);
});
