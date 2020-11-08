const express = require('express');
const { check, query } = require('express-validator');
const router = express.Router();
const Movies = require('../models/movies')

router.get('/', [
    query('search').optional().isString().escape().trim(),
    query('sort_by').optional().isString().escape().trim(),
    query('order_by').optional().isString().escape().trim(),
    query('genre').optional(),
    check('genre.*').optional().isString().escape().trim(),
], async (req, res) => {
    const genreList = []
    const sortBy = req.query.sort_by
    const orderBy = req.query.order_by === 'asc' ? 1 : -1
    const sortingParams = {}
    sortingParams[sortBy] = orderBy
    const searchString = new RegExp(`.*${req.query.search || ''}.*`, 'i')
    const filter = {
        $or: [
            { "name": searchString },
            { "director": searchString }
        ],
        genre: { $all: genreList }
    }
    if (req.query.genre)
        Object.keys(req.query.genre).map(genre => {
            const newGenre = new RegExp(`${genre}`, 'i')
            genreList.push(newGenre)
        })
    if (genreList.length === 0)
        delete filter.genre
    try {
        const movies = await Movies.find(filter).sort(sortingParams);
        res.send(movies)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router