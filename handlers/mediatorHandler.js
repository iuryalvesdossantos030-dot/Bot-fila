import redis from '../services/redis.js';

export async function joinMediator(interaction) {
  const list = await redis.lrange('mediators', 0, -1);
  if (list.includes(interaction.user.id)) {
    return interaction.reply({ content: '⚠️ Você já está na fila.', ephemeral: true });
  }

  await redis.rpush('mediators', interaction.user.id);
  await interaction.reply({ content: '⚖️ Entrou na fila de mediadores.', ephemeral: true });
}

export async function leaveMediator(interaction) {
  await redis.lrem('mediators', 0, interaction.user.id);
  await interaction.reply({ content: '❌ Saiu da fila de mediadores.', ephemeral: true });
}
