//Using Express
var express = require('express');
var books = express.Router();
books.use(express.json());
//Using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });
//Using JOI for validation
const joi = require('joi');

//Mongoose Schema
const bookSchema = mongoose.Schema({
    name: { type: String, trim: true, default: '' },
    publisher: { type: String, trim: true, default: '' },
    price: { type: Number },
    category: { type: String, trim: true, default: '' },
    date: { type: Date }
});

// JOI Shcema
const schema = joi.object({
    name: joi.string()
        .min(3)
        .max(60)
        .required(),

    publisher: joi.string()
        .min(3)
        .max(60)
        .required(),

    price: joi.number()
        .positive()
        .min(10)
        .max(1000)
        .required(),

    category: joi.string()
        .min(3)
        .max(60)
        .required(),

    date: joi.date()
        .less('now')
        .required()
});

// //Create the module doc
const booksModel = mongoose.model('booksModel', bookSchema);

// // ADD - get all - get detials - update ---delete 

//Add new book by body
books.post('/', function (req, res) {
    //Body validation
    const reslut = schema.validate(req.body);
    if (reslut.error) {
        return res.status(400).send('The parameter is missing');
    }
    var book = new booksModel({
        name: req.body.name,
        publisher: req.body.publisher,
        price: req.body.price,
        category: req.body.category,
        date: req.body.date
    });
    book
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

books.get('/', function (req, res) {
    res.status(200).send('books')
});

module.exports = books;