const app = require('express')();
const { mongoose } = require("./db/connection")
const bodyParser = require('body-parser');
const { body, validationResult, check, query } = require('express-validator');
app.use(bodyParser.json());

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
app.get('/movie/:id', (req, res) => {
    res.send('hello world')
})

app.post('/movie', [
    body('99popularity').optional().isNumeric().escape().trim(),
    body('director').optional().isString().escape().trim(),
    body('genre').optional().isArray().escape(),
    check('genre.*').optional().isString().escape().trim(),
    body('imdb_score').optional().isNumeric().escape(),
    body('name').isString().escape().trim(),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // errormessages
        }
        const newMovie = new Movies(req.body);
        newMovie.save(function (err) {
            if (!err) console.log('Success!');
            res.send("Success")
        });
    })

app.put('/movie', [
    body('99popularity').optional().isNumeric().escape().trim(),
    body('director').optional().isString().escape().trim(),
    body('genre').optional().isArray(),
    check('genre.*').optional().isString().escape().trim(),
    body('imdb_score').optional().isNumeric().escape(),
    body('id').isString().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // errormessages
    }
    console.log(req.body)
    const id = req.body.id
    delete req.body.id
    delete req.body.name
    console.log(req.body)
    Movies.findByIdAndUpdate(id, req.body, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Success")
        }
    })
})

app.get('/movies', [
    query('search').optional().isString().escape().trim()
], async (req, res) => {
    const searchString = new RegExp(`.*${req.query.search || ''}.*`, 'i') 
    await Movies.find({
        $or: [
            { "name": searchString },
            { "director": searchString }
        ]
    }, function (err, docs) {
        console.error(err)
        res.send(docs)
    });
})

app.get('/', async (req, res) => {
    res.send('hello world')
})

app.listen(3000, () => {
    console.log('Server is running')
})