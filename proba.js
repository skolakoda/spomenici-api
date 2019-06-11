require('dotenv').config()
const mongoose = require('mongoose')

const { URI } = require('./utils/config')
const SpomenikSchema = require('./models/SpomenikSchema')

mongoose.connect(URI, { useNewUrlParser: true })
  .then(() => console.log('konektovan...'))
  .catch(err => console.error('ne moze se kontektovat', err))

const Spomenik = mongoose.model('Spomenik', SpomenikSchema, 'spomenici')

async function createSpomenik() {
  const spomenik = new Spomenik({
    naslov:	'Kalemegdanska tvrdjava',
    opis:	'Tvrdjava na Kalemegdanu.',
    kategorija:	'tvrdjava',
    lokacija: {
      lat: 44.8005001,
      lon: 20.4865851
    }
  })

  const result = await spomenik.save()
  console.log(result)
}

// createSpomenik()

async function getSpomenici() {
  const spomenici = await Spomenik
    .find()
    .sort({ naslov: 1 }) // sortira ulazno
    .select({ naslov: 1, opis: 1 }) // vadi samo naslov i opis
  console.log(spomenici)
}

getSpomenici()
