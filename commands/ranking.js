const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ranking')
    .setDescription('Ver ranking'),

  async execute(interaction, db, _, isStaff) {

    if (!isStaff(interaction))
      return interaction.reply({ content: 'Somente STAFF.', ephemeral: true });

    db.all("SELECT * FROM ranking ORDER BY elo DESC LIMIT 10", [], (err, rows) => {

      let msg = '🏆 Ranking:\n';

      rows.forEach((r, i) => {
        msg += `${i + 1}. <@${r.jogador}> - ${r.elo} ELO\n`;
      });

      interaction.reply(msg);
    });
  }
};
