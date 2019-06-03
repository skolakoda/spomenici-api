require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const colectionRouter = require("./routes/kolekcije/index");
const { port, domain } = require("./config/setup");
const registracija = require("./routes/users/registracija");
const about = require("./routes/users/about");

// Config
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// User routes

app.get("/korisnici/:id", about);
app.post("/registracija", registracija);

// Routes
app.use("/kolekcija", colectionRouter);
app.get("/", (req, res) => res.send("Dobrodosli na Spomenici-API!"));

// Server
app.listen(port, () => {
  console.log(`Server at ${domain}!`);
});
