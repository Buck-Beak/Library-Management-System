const Book = require('../models/bookModel');
const mongoose = require('mongoose');

//GET all books
const getBooks = async(req,res)=>{
    const books = await Book.find({}).sort({createdAt:-1});
    res.status(200).json(books);
};

//GET a single book
const getBook = async(req,res)=>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such book'});
    }
    const book = await Book.findById(id);
    if(!book){
        return res.status(400).json({error:'No such book'})
    }
    res.status(200).json(book);
}

//CREATE new book
const createBook = async(req,res)=>{
    const {bookName,author,description,available} = req.body

    let emptyFields = [];
    if(!bookName){
        emptyFields.push('bookName');
    }
    if(!author){
        emptyFields.push('author');
    }
    if(!description){
        emptyFields.push('description');
    }
    if(!available){
        emptyFields.push('available');
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields});
    }

    //add doc to db
    try{
        const book = await Book.create({bookName,author,description,available});
        res.status(200).json(book);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

//DELETE book
const deleteBook = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such book'});
    }
    const book = await Book.findOneAndDelete({_id:id});
    if(!book){
        return res.status(400).json({error:'No such book'})
    }
    res.status(200).json(book);
}

//UPDATE book
const updateBook=async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such book'});
    }
    const book = await Book.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!book){
        return res.status(400).json({error:'No such book'})
    }
    res.status(200).json(book);
}

const rentBook = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such book' });
    }

    const book = await Book.findById(id);
    if (!book) {
        return res.status(400).json({ error: 'No such book' });
    }
    if (book.available <= 0) {
        return res.status(400).json({ error: 'No available copies' });
    }

    // Decrement available count
    book.available -= 1;
    await book.save();
    return res.status(200).json(book);
};

module.exports = {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook,
    rentBook
}