const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fila')
    .setDescription('Criar fila')
    .addStringOption(option =>
      option.setName('modo')
        .setDescription('1v1, 2v2, 3v3, 4v4')
        .setRequired(true)
    ),

  async execute(interaction, db, isOwner) {

    if (!isOwner(interaction))
      return interaction.reply({ content: 'Somente o DONO.', ephemeral: true });

    const modo = interaction.options.getString('modo');

    interaction.reply(`Fila ${modo} criada.`);
  }
};
