# Spomenici API

Javni API za pravljenje turističkih aplikacija (slanje, pretraga i brisanje lokacija).

Vidi: https://spomenici-api.herokuapp.com/

## API Dokumentacija

### Kolekcije

- GET /kolekcija/{naziv} (vraca sve spomenike)
- GET /kolekcija/{naziv}/nadji/id (vraca jedan spomenik)
- GET /kolekcija/{naziv}/kategorije (vraca sve kategorije po kolekciji)
- POST /kolekcija/{naziv}/dodaj (obavezna polja: naslov, kategorija, lat i lon, opciono: opis)
- PUT /kolekcija/{naziv}/uredi/id (obavezna polja: naslov, kategorija, lat i lon)
- DELETE /kolekcija/{naziv}/obrisi/id

Umesto varijable `naziv`, mozete uneti bilo koji naziv u rutama. Spomenici API podrzava vise razlicitih kolekcija, poput:

- https://spomenici-api.herokuapp.com/kolekcija/novogroblje
- https://spomenici-api.herokuapp.com/kolekcija/spomenici
- https://spomenici-api.herokuapp.com/kolekcija/itfirme

### Korisnici

- POST /korisnici/registracija (obavezna polja: email, password i repeatPassword)
- GET /korisnici/pokazi/id (vraca jednog korisnika)
- GET /korisnici/login

Nakon uspesne prijave, za svaki naredni HTTP zahtev u headeru slati polje `auth` sa vrednoscu "Bearer ${token}"

### Format odgovora

Svaki odgovor servera ima standardan JSON format:

```
{
  "status": "success", // ili "error"
  "data": {}, // ili null
  "message": "Info poruka" // ili null
}
```

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
