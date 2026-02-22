const db = require('../database');

let fila1v1 = [];
let confirmados = [];

module.exports = async (interaction) => {

  if (interaction.customId === "gel_normal") {

    const mediadores = await db.get("mediadores") || [];
    if (mediadores.length === 0)
      return interaction.reply({ content: "❌ Não há mediadores presentes.", ephemeral: true });

    fila1v1.push(interaction.user.id);

    if (fila1v1.length === 2) {
      const guild = interaction.guild;

      const canal = await guild.channels.create({
        name: `partida-${interaction.user.username}`,
        type: 0,
        permissionOverwrites: [
          { id: guild.id, deny: ['ViewChannel'] },
          { id: fila1v1[0], allow: ['ViewChannel'] },
          { id: fila1v1[1], allow: ['ViewChannel'] },
          { id: mediadores[0], allow: ['ViewChannel'] }
        ]
      });

      fila1v1 = [];
      confirmados = [];

      await canal.send("Partida criada. Clique em confirmar.");
    }

    return interaction.reply({ content: "Aguardando outro jogador...", ephemeral: true });
  }

};
