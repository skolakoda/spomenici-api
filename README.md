# Spomenici API

Javni API za pravljenje travel aplikacija (slanje, pretraga i brisanje lokacija).

Vidi: https://spomenici-api.herokuapp.com/

## API Dokumentacija

Svaki odgovor servera ima standardan JSON format:

```
{
  "status": "success", // ili "error"
  "data": {}, // ili null
  "message": "Info poruka" // ili null
}
```

#### GET /kolekcija/{naziv}

Vraca sve objekte. Umesto varijable `naziv`, mozete uneti bilo koju postojecu kolekciju, npr:
- [/kolekcija/itfirme](https://spomenici-api.herokuapp.com/kolekcija/itfirme)
- [/kolekcija/toilets](https://spomenici-api.herokuapp.com/kolekcija/toilets)

Server vraca sliku kao [base64](https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html) string. Da bi se prikazala u HTML-u potrebno je dodati prefiks `data:image/png;base64,`

#### GET /kolekcija/{naziv}/nadji/{id}

Vraca jedan objekat.

#### GET /kolekcija/{naziv}/kategorije

Vraca sve kategorije po kolekciji.

#### POST /kolekcija/{naziv}/dodaj (za prijavljene korisnike)

Obavezna i opciona polja kada se šalje novi objekat:

```js
{
  naslov: String,     // required
  opis: String,
  kategorija: String, // required
  // geolokacija:
  lat: Number,        // required
  lon: Number         // required
  slika: File,
  website: String,
  // radno vreme u formatu 0-24:
  od: Number,
  do: Number
}
```

Slika se salje serveru kao fajl.

#### PUT /kolekcija/{naziv}/uredi/{id} (za prijavljene korisnike)

Može se opciono azurirati bilo koje polje na osnovu id-a.

#### DELETE /kolekcija/{naziv}/obrisi/{id} (za admine)

## Autentikacija

- POST /korisnici/registracija (obavezna polja: email, pass i repeatPass)
- GET /korisnici/pokazi/id (vraca jednog korisnika)
- POST /korisnici/login
- PUT /korisnici/uredi/id (opciono se azurira bilo koje polje)
- GET /korisnici/email (obavezno polje email)

Nakon uspesne prijave, za svaki naredni HTTP zahtev u headeru slati polje `auth` sa vrednoscu "Bearer ${token}"

## Razvoj

```
$ git clone https://github.com/skolakoda/spomenici-api.git
$ cd spomenici-api
$ npm install
```

Da bi aplikacija radila neophodno je napraviti `.env` fajl i dodati sledece variable:

- `DB_URI` sa linkom ka MongoDB bazi (ili trazite kredencijale ili otvorite svoju na lokalu)
- `DB_NAME` ime postojece ili novokreirane baze
- `NODE_ENV` sa vrednoscu "development"
- `TOKEN_KLJUCH` iz heroku dashboard settings-a (ili bilo koji string za lokalni razvoj)

Konacno, kad dodate varijable okruzenja, pokrenite:

```
$ npm run dev
```

### Kodni standard

Ovaj projekat koristi [kodni standard Škole koda](https://github.com/skolakoda/kodni-standard).
