async function criarSala(guild, jogadores) {

  const categoria = guild.channels.cache.find(c => c.name === "PARTIDAS");

  const canal = await guild.channels.create({
    name: `partida-${Date.now()}`,
    type: 0,
    parent: categoria?.id,
    permissionOverwrites: [
      {
        id: guild.id,
        deny: ['ViewChannel']
      },
      ...jogadores.map(id => ({
        id: id,
        allow: ['ViewChannel', 'SendMessages']
      }))
    ]
  });

  canal.send(`🎮 Partida iniciada!
Jogadores:
${jogadores.map(id => `<@${id}>`).join('\n')}`);
}

module.exports = { criarSala };
