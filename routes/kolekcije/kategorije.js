module.exports = async(req, res) => {
  const { Spomenik } = res.locals

  Spomenik.distinct('kategorija')
    .then(data => res.send(data))
}
