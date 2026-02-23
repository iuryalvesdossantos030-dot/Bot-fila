import redis from '../utils/redis.js';
import { addWin } from './rankingHandler.js';

export async function escolherVencedor(interaction) {
  const vencedorId = interaction.customId.split('_')[1];

  // Verifica se é mediador
  const mediadores = await redis.smembers('mediadores');
  if (!mediadores.includes(interaction.user.id)) {
    return interaction.reply({
      content: '❌ Apenas o mediador pode escolher o vencedor.',
      ephemeral: true
    });
  }

  await addWin(vencedorId);

  await interaction.update({
    content: `🏆 **Vitória confirmada para <@${vencedorId}>**`,
    components: []
  });

  setTimeout(() => {
    interaction.channel.delete().catch(() => {});
  }, 10000);
}
