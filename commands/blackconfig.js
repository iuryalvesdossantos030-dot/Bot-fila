const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blackconfig')
    .setDescription('Painel principal'),

  async execute(interaction) {

    if (interaction.user.id !== interaction.guild.ownerId)
      return interaction.reply({ content: "Apenas dono.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor("#000000")
      .setTitle("🖤 Black Config");

    interaction.reply({ embeds: [embed] });
  }
};
