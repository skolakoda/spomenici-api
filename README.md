# Spomenici API

Javni API za pravljenje turističkih aplikacija (slanje, pretraga i brisanje lokacija).

Vidi: https://spomenici-api.herokuapp.com/

## API Endpoints

- GET /spomenici (vraca sve spomenike)
- GET /spomenik/:id (vraca jedan spomenik)
- POST /dodaj-spomenik
- PUT /izmeni-spomenik/:id (u izradi)
- DELETE /obrisi-spomenik/:id (u izradi)

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
