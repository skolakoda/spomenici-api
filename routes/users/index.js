const express = require("express")
const router = express.Router()

const about = require("./about")
const registracija = require("./registracija")
const login = require("./login")

router.get("/login", login)
router.get("/:id", about)
router.post("/registracija", registracija)

module.exports = router
