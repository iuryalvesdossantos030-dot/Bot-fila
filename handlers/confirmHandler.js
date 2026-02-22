import redis from '../services/redis.js';
import { sendPixMessage } from './pixHandler.js';

export async function confirmPresence(interaction) {
  const [matchId] = interaction.channel.topic.split(':');
  const key = `confirm:${matchId}`;

  const confirmed = await redis.smembers(key);
  if (confirmed.includes(interaction.user.id)) {
    return interaction.reply({ content: '⚠️ Você já confirmou.', ephemeral: true });
  }

  await redis.sadd(key, interaction.user.id);
  const total = await redis.scard(key);

  await interaction.reply({ content: `✅ Confirmação (${total}/2)`, ephemeral: true });

  if (total === 2) {
    await sendPixMessage(interaction.channel);
  }
}
