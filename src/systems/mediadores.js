const db = require("../utils/database")

function entrar(userId) {
  const data = db.load()
  if (!data.mediadores.includes(userId)) {
    data.mediadores.push(userId)
    db.save(data)
  }
}

function sair(userId) {
  const data = db.load()
  data.mediadores = data.mediadores.filter(id => id !== userId)
  db.save(data)
}

function obterDisponivel() {
  const data = db.load()
  return data.mediadores.length > 0 ? data.mediadores[0] : null
}

module.exports = { entrar, sair, obterDisponivel }
