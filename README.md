# Spomenici API

Javni API za pravljenje turističkih aplikacija (slanje, pretraga i brisanje lokacija).

Vidi: https://spomenici-api.herokuapp.com/

## API Endpoints

- GET /spomenici (vraca sve spomenike)
- GET /spomenici/id (vraca jedan spomenik)
- POST /spomenici/dodaj (obavezna polja: naslov, kategorija, lat i lon, opciono: opis)
- POST /registracija (obavezna polja: email, password i repeatPassword)
- PUT /spomenici/uredi/id (obavezna polja: naslov, kategorija, lat i lon)
- DELETE /spomenici/obrisi/id

API podrzava vise razlicitih kolekcija. Umesto kolekcije `spomenici`, mozete uneti bilo koji naziv u rutama.

Za registraciju obavezna polja su mail, password i repeat password(ruta u izradi)

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

## Kodni standard

Ovaj projekat koristi [kodni standard Škole koda](https://github.com/skolakoda/kodni-standard).
