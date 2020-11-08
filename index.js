const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000
const movie = require('./routes/movie')
const movies = require('./routes/movies')
app.use('/movie', movie)
app.use('/movies', movies)

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})