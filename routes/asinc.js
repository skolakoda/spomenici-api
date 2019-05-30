async function ucitaj() {
   const res = await fetch("http://localhost:8090/spomenici/")
   const data = await res.json()
    console.log(data);
}

ucitaj()

