import redis from '../utils/redis.js';

export async function entrarMediador(interaction) {
  await redis.sadd('mediadores', interaction.user.id);

  await interaction.reply({
    content: '⚖️ Você entrou na fila de mediadores.',
    ephemeral: true
  });
}
