const { ChannelType, PermissionFlagsBits } = require("discord.js")
const config = require("../config.json")

async function criarSala(guild, jogadores, mediador) {
  return await guild.channels.create({
    name: `partida-${Date.now()}`,
    type: ChannelType.GuildText,
    parent: config.categoriaPartidas,
    permissionOverwrites: [
      { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
      ...jogadores.map(id => ({
        id,
        allow: [PermissionFlagsBits.ViewChannel]
      })),
      {
        id: mediador,
        allow: [PermissionFlagsBits.ViewChannel]
      }
    ]
  })
}

module.exports = { criarSala }
