const filas = require("../systems/filas")
const partidas = require("../systems/partidas")

module.exports = (client) => {

  client.on("interactionCreate", async interaction => {

    if (!interaction.isButton()) return

    if (interaction.customId === "gel_normal")
      filas.entrar1v1("gelNormal", interaction)

    if (interaction.customId === "gel_infinito")
      filas.entrar1v1("gelInfinito", interaction)

    if (interaction.customId === "confirmar_partida")
      partidas.confirmar(interaction)
  })
}
