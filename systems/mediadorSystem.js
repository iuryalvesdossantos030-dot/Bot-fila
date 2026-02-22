const db = require('../database');

module.exports = async (interaction) => {

  if (interaction.customId === "entrar_mediador") {
    await db.push("mediadores", interaction.user.id);
    return interaction.reply({ content: "Entrou na fila de mediadores.", ephemeral: true });
  }

  if (interaction.customId === "sair_mediador") {
    let lista = await db.get("mediadores") || [];
    lista = lista.filter(id => id !== interaction.user.id);
    await db.set("mediadores", lista);
    return interaction.reply({ content: "Saiu da fila.", ephemeral: true });
  }

  if (interaction.customId === "remover_mediador") {
    if (interaction.user.id !== interaction.guild.ownerId)
      return interaction.reply({ content: "Apenas dono.", ephemeral: true });

    await db.set("mediadores", []);
    return interaction.reply({ content: "Fila resetada.", ephemeral: true });
  }

};
