require('dotenv').config()
const mongoose = require('mongoose')

const { URI } = require('./utils/config')
const SpomenikSchema = require('./models/SpomenikSchema')

mongoose.connect(URI, { useNewUrlParser: true })
  .then(() => console.log('konektovan...'))
  .catch(err => console.error('ne moze se kontektovat', err))

const Spomenik = mongoose.model('Spomenik', SpomenikSchema, 'spomenici')

// dodati jedinstven naslov
async function createSpomenik() {
  const spomenik = new Spomenik({
    naslov: 'Kalemegdan',
    opis:	'Tvrdjava na Kalemegdanu.',
    kategorija:	'tvrdjava',
    lokacija: {
      lat: 44.8005001,
      lon: 20.4865851
    }
  })

  spomenik.save()
    .then(res => console.log(res))
    .catch(err => console.error(err.message))
}

createSpomenik()

async function getSpomenici() {
  const spomenici = await Spomenik
    .find()
    .sort({ naslov: 1 }) // sortira ulazno
    .select({ naslov: 1, opis: 1 }) // vadi samo naslov i opis
  console.log(spomenici)
}

// getSpomenici()
