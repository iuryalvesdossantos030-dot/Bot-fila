const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setpix')
    .setDescription('Definir chave pix')
    .addStringOption(o =>
      o.setName('chave')
        .setDescription('Chave Pix')
        .setRequired(true)
    ),

  async execute(interaction, db, isOwner) {

    if (!isOwner(interaction))
      return interaction.reply({ content: 'Somente DONO.', ephemeral: true });

    const chave = interaction.options.getString('chave');

    db.run("INSERT OR REPLACE INTO pix (guild, chave) VALUES (?, ?)",
      [interaction.guild.id, chave]);

    interaction.reply('Chave Pix salva.');
  }
};
