const config = require("../config.json")

async function log(guild, mensagem) {
  const canal = guild.channels.cache.get(config.logsChannel)
  if (canal) canal.send(mensagem)
}

module.exports = { log }
