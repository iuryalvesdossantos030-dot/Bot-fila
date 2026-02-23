import { addWin, addLoss } from './rankingHandler.js';

export async function finalizeMatch(interaction) {
  const players = interaction.channel.members
    .filter(m => !m.user.bot)
    .map(m => m.id);

  if (players.length < 2) {
    return interaction.reply({ content: 'Erro ao finalizar.', ephemeral: true });
  }

  const winner = players[0];
  const loser = players[1];

  addWin(winner);
  addLoss(loser);

  await interaction.channel.send(
    `🏆 <@${winner}> venceu a partida!\n❌ <@${loser}> perdeu.`
  );

  setTimeout(() => interaction.channel.delete(), 5000);
}
