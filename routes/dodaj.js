require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;

const { URI } = require('../config/setup');

const dodaj = (req, res) => {
    res.send('bla');
}

module.exports = dodaj
