const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verpix')
    .setDescription('Ver chave pix'),

  async execute(interaction, db, _, isStaff) {

    if (!isStaff(interaction))
      return interaction.reply({ content: 'Somente STAFF.', ephemeral: true });

    db.get("SELECT chave FROM pix WHERE guild = ?",
      [interaction.guild.id],
      (err, row) => {

        if (!row) return interaction.reply('Nenhuma chave cadastrada.');

        interaction.reply(`💰 Chave Pix: ${row.chave}`);
      });
  }
};
