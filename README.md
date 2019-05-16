# spomenici-api

API za dodavanje lokacija na adresi https://spomenici-api.herokuapp.com/

## Dokumentacija

Endpoints:
- GET /spomenici (vraca sve spomenike)
- POST /dodaj-spomenik (u izradi)
```
{
        "naslov": "Vukov spomenik",
        "opis": "Veoma lep spomenik",
        "kategorija": "spomenik",
        "slika": fajl,
        "lokacija": {
            "lat": 0,
            "lon": 0
        }
    }
```

## Razvoj

```
$ git clone https://github.com/skolakoda/spomenici-api.git
$ cd spomenici-api
$ npm install
```

- Napraviti `.env` fajl i dodati dve variable
- DB_URI mora sadrzati link ka "mongodb"(mozete otvoriti na lokalu)
- NODE_ENV mora imati vrednost "development"

`
$ npm start
`
