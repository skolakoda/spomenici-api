require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { port, domain } = require('./config/setup');
const spomenici = require('./routes/spomenici');
const spomenik = require('./routes/spomenik');
const dodaj = require('./routes/dodaj');
const izmeni = require('./routes/izmeni');

// Config
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.send('Dobrodosli na Spomenici-API!'));

app.get('/spomenici', spomenici);

app.get('/spomenik/:id', spomenik);

app.post('/dodaj-spomenik', dodaj);

app.put('/izmeni-spomenik', izmeni);

// Server
app.listen(port, () => {
  console.log(`Server at ${domain}!`);
});
