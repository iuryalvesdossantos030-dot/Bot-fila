const { SlashCommandBuilder } = require('discord.js');
const { setPix } = require('../systems/pixSystem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setpix')
    .setDescription('Definir chave Pix')
    .addStringOption(opt =>
      opt.setName('chave').setDescription('Chave Pix').setRequired(true)),

  async execute(interaction, db, isOwner) {

    if (!isOwner(interaction))
      return interaction.reply({ content: '❌ Apenas o DONO pode usar.', ephemeral: true });

    const chave = interaction.options.getString('chave');
    setPix(chave);

    interaction.reply('✅ Chave Pix atualizada.');
  }
};
