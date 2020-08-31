//Using Express
var express = require('express');
var categories = express.Router();
categories.use(express.json());
//Using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });
//Using JOI
const Joi = require('joi');


categories.get('/', function (req, res) {
    res.status(200).send('categories')
});

module.exports = categories;