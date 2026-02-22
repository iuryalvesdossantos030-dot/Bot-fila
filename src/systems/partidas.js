const db = require("../utils/database")
const { gerarQR } = require("../utils/pix")

function registrar(canalId, jogadores, mediador, modo) {
  const data = db.load()
  data.partidasAbertas[canalId] = {
    jogadores,
    mediador,
    modo,
    confirmados: []
  }
  db.save(data)
}

async function confirmar(interaction) {
  const data = db.load()
  const partida = data.partidasAbertas[interaction.channel.id]
  const userId = interaction.user.id

  if (!partida.jogadores.includes(userId))
    return interaction.reply({ content: "Apenas jogadores confirmam.", ephemeral: true })

  if (!partida.confirmados.includes(userId))
    partida.confirmados.push(userId)

  if (partida.confirmados.length < 2)
    return interaction.reply({ content: "Aguardando outro jogador...", ephemeral: true })

  const valor = data.filas[partida.modo].valor
  const qr = await gerarQR(data.pix.chave, valor)

  interaction.channel.send({
    content: `💳 Pix: ${data.pix.chave}\nValor: R$ ${valor}`,
  })

  db.save(data)
}

module.exports = { registrar, confirmar }
