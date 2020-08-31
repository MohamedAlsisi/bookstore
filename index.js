//Using Express
const express = require('express');
const store = express();
store.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
store.get('/', function (req, res) {
    res.status(200).send('Welcome to the Book Store');
});

// define the routes
var books = require('./routes/books');
store.use('/books', books);

// var categories = require('./routes/categories');
// store.use('/categories', categories);

// var publishers = require('./routes/publishers');
// store.use('/publishers', publishers);

// var users = require('./routes/users');
// store.use('/users', users);


store.listen(3000);