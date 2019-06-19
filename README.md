# Spomenici API

Javni API za pravljenje travel aplikacija (slanje, pretraga i brisanje lokacija).

Vidi: https://spomenici-api.herokuapp.com/

## API Dokumentacija

### Kolekcije objekata

- GET /kolekcija/{naziv} (vraca sve objekte)

Umesto varijable `naziv`, mozete uneti bilo koju postojecu kolekciju, npr: [/kolekcija/itfirme](https://spomenici-api.herokuapp.com/kolekcija/itfirme)

- GET /kolekcija/{naziv}/nadji/{id} (vraca jedan spomenik)
- GET /kolekcija/{naziv}/kategorije (vraca sve kategorije po kolekciji)
- POST /kolekcija/{naziv}/dodaj (obavezna polja: naslov, kategorija, lat i lon, opciono: opis, slika)
- PUT /kolekcija/{naziv}/uredi/{id} (opciono se azurira bilo koje polje)
- DELETE /kolekcija/{naziv}/obrisi/{id}

Slika se salje kao fajl, a server je sluzi kao [base64](https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html) string. U HTML-u se prikazuje na sledeci nacin: `<img src="data:image/png;base64, ${slika}" />`

### Korisnici

- POST /korisnici/registracija (obavezna polja: email, password i repeatPassword)
- GET /korisnici/pokazi/{id} (vraca jednog korisnika)
- GET /korisnici/login
- PUT /korisnici/uredi/{id} (opciono se azurira bilo koje polje). Da bi se promenio password, treba popuniti polja password i repeatPass

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
