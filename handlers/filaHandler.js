import redis from '../utils/redis.js';

export async function entrarFila(interaction) {
  const { customId, user } = interaction;
  const [, modo, valor] = customId.split('_');

  const filaKey = `fila:${modo}:${valor}`;
  await redis.rpush(filaKey, user.id);

  const total = await redis.llen(filaKey);

  await interaction.reply({
    content: `⏳ Você entrou na fila **${modo.toUpperCase()} | R$${valor}**\n👥 Jogadores na fila: ${total}`,
    ephemeral: true
  });
}
