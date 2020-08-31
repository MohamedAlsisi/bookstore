//Using Express
var express = require('express');
var publishers = express.Router();
publishers.use(express.json());
//Using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });
//Using JOI
const Joi = require('joi');

publishers.get('/', function (req, res) {
    res.status(200).send('publishers')
});

module.exports = publishers;