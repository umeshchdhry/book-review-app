const express = require('express');
const router = express.Router();
const axios = require('axios');
const books = require('./booksdb').books;

// Task 1: Get all books
router.get('/', async (req, res) => {
    try {
        res.json(books);
    } catch (error) {
        res.status(500).send('Error fetching books');
    }
});

// Task 2: Get books by ISBN
router.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (book) res.json(book);
    else res.status(404).send('Book not found');
});

// Task 3: Get books by Author
router.get('/author/:author', (req, res) => {
    const author = req.params.author;
    const booksByAuthor = books.filter(b => b.author.toLowerCase() === author.toLowerCase());
    res.json(booksByAuthor);
});

// Task 4: Get books by Title
router.get('/title/:title', (req, res) => {
    const title = req.params.title;
    const booksByTitle = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    res.json(booksByTitle);
});

module.exports = { general: router };
