require('dotenv').config();
const mongo = require("mongodb");

const { URI } = require('../config/setup');

const dodaj = (req, res) => {
    res.send('bla');
}

module.exports = dodaj
