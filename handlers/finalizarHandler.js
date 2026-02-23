import { addWin } from './rankingHandler.js';

export async function finalizarPartida(interaction, vencedorId) {
  await addWin(vencedorId);

  await interaction.channel.send(`🏆 Vitória confirmada para <@${vencedorId}>`);

  setTimeout(() => {
    interaction.channel.delete().catch(() => {});
  }, 10000);
}
