const db = require("../utils/database")
const mediadores = require("./mediadores")
const { criarSala } = require("../utils/sala")
const partidas = require("./partidas")

async function entrar1v1(tipo, interaction) {
  const data = db.load()
  const userId = interaction.user.id

  if (!data.filas["1v1"][tipo].includes(userId)) {
    data.filas["1v1"][tipo].push(userId)
    db.save(data)
  }

  verificarMatch1v1(interaction.guild, tipo)
}

async function verificarMatch1v1(guild, tipo) {
  const data = db.load()
  const fila = data.filas["1v1"][tipo]

  if (fila.length < 2) return

  const mediador = mediadores.obterDisponivel()
  if (!mediador) return

  const jogadores = fila.splice(0, 2)
  db.save(data)

  const canal = await criarSala(guild, jogadores, mediador)
  partidas.registrar(canal.id, jogadores, mediador, "1v1")
}

module.exports = { entrar1v1 }
