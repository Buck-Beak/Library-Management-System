const express = require('express');
const {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook,
    rentBook
}=require('../controllers/bookController')
const router = express.Router();

//GET all workouts
router.get('/',getBooks);

//GET a single workout
router.get('/:id',getBook);

//POST a new workout
router.post('/',createBook);

//DELETE a new workout
router.delete('/:id',deleteBook);

//UPDATE a new workout
router.patch('/:id',updateBook);

router.patch('/:id/rent', rentBook);

module.exports = router