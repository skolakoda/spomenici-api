const express = require("express");
const router = express.Router();

const { tokenCheck } = require("../../utils/helpers");

const about = require("./about");
const registracija = require("./registracija");
const login = require("./login");

router.post("/login", login);
router.get("/pokazi/:id", tokenCheck, about);
router.post("/registracija", registracija);

module.exports = router;
