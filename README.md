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

#### GET /kolekcija/{naziv}/strana/{brojStrane}/{poStrani?}

Vraća određen broj objekata po stranici. Na primer: `/kolekcija/itfirme/strana/2`

Poslednji parametar, broj predmeta `poStrani` je opcion.

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

#### POST /korisnici/registracija

Obavezna polja: email, pass i repeatPass.

Nakon uspesne registracije vraca token u `x-auth-token` polju u headeru.

#### POST /korisnici/login

Obavezna polja: email i pass.

Nakon uspesne prijave vraca token u headeru kao odgovor.

Za svaki naredni ovlasceni zahtev u headeru slati polje `x-auth-token` sa tokenom.

#### GET /korisnici/pokazi/id

Vraca jednog korisnika

#### PUT /korisnici/uredi/id

Opciono se azurira bilo koje polje.

#### GET /korisnici/reset-password

Obavezno polje je email. Salje novu lozinku na email.

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

## Kodni standard

Ovaj projekat koristi [kodni standard Škole koda](https://github.com/skolakoda/kodni-standard).

## TODO

- da slike budu opcione