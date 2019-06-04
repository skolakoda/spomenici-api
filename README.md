# Spomenici API

Javni API za pravljenje turističkih aplikacija (slanje, pretraga i brisanje lokacija).

Vidi: https://spomenici-api.herokuapp.com/

## API Dokumentacija

### Kolekcije

- GET kolekcija/{naziv} (vraca sve spomenike)
- GET kolekcija/{naziv}/id (vraca jedan spomenik)
- POST kolekcija/{naziv}/dodaj (obavezna polja: naslov, kategorija, lat i lon, opciono: opis)
- PUT kolekcija/{naziv}/uredi/id (obavezna polja: naslov, kategorija, lat i lon)
- DELETE kolekcija/{naziv}/obrisi/id

API podrzava vise razlicitih kolekcija. Umesto kolekcija `naziv`, mozete uneti bilo koji naziv u rutama.

### User

- POST /registracija (obavezna polja: email, password i repeatPassword)
- GET /korisnici/id (vraca jednog korisnika)
- GET /korisnici/login (nije do kraja iztestirano)

Za registraciju obavezna polja su mail, password i repeat password(ruta u izradi)

### JSON Response

Successful request:

```
{
  "status": "success",
  "data": {
    /* Application-specific data would go here. */
  },
  "message": null /* Or optional success message */
}
```

Failed request:

```
{
  "status": "error",
  "data": null, /* or optional error payload */
  "message": "Error xyz has occurred"
}
```

## Razvoj

```
$ git clone https://github.com/skolakoda/spomenici-api.git
$ cd spomenici-api
$ npm install
```

Da bi aplikacija radila neophodno je napraviti `.env` fajl i dodati dve variable:

- `DB_URI` sa linkom ka MongoDB bazi (ili trazite kredencijale ili otvorite svoju na lokalu)
- `DB_NAME` ime postojece ili novokreirane baze
- `NODE_ENV` sa vrednoscu "development"

Konacno, kad dodate varijable okruzenja, pokrenite:

```
$ npm run dev
```

### Kodni standard

Ovaj projekat koristi [kodni standard Škole koda](https://github.com/skolakoda/kodni-standard).
