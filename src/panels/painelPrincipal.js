const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (interaction) => {

  const embed = new EmbedBuilder()
    .setColor("#2b2d31")
    .setTitle("⚙️ Black Config");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("gel_normal")
      .setLabel("Filas 1v1")
      .setStyle(ButtonStyle.Primary)
  );

  await interaction.reply({
    embeds: [embed],
    components: [row]
  });

};
