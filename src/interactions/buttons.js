const filas = require("../systems/filas");
const partidas = require("../systems/partidas");

module.exports = (client) => {

  client.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

    try {

      // GEL NORMAL
      if (interaction.customId === "gel_normal") {
        await filas.entrar1v1("gelNormal", interaction);
      }

      // GEL INFINITO
      if (interaction.customId === "gel_infinito") {
        await filas.entrar1v1("gelInfinito", interaction);
      }

      // CONFIRMAR PARTIDA
      if (interaction.customId === "confirmar_partida") {
        await partidas.confirmar(interaction);
      }

    } catch (error) {
      console.error("Erro no botão:", error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: "❌ Ocorreu um erro ao processar o botão.",
          ephemeral: true
        });
      }
    }

  });

};
