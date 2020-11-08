const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const port = 3000;
const movie = require('./routes/movie');
const movies = require('./routes/movies');
const user = require('./routes/user');

app.use('/movie', movie);
app.use('/movies', movies);
app.use('/user', user);

app.listen(port, () => {
  console.info(`Server is running at ${port}`);
});
