import redis from '../services/redis.js';
import { queueEmbed } from '../embeds/queueEmbed.js';
import { ticketEmbed } from '../embeds/ticketEmbed.js';
import { createMatchId } from '../utils/match.js';
import { startConfirmTimeout } from './timeoutHandler.js';
import { blockSpam } from '../services/antiSpam.js';
import { log } from '../services/logger.js';
import { PermissionsBitField, ChannelType } from 'discord.js';

export async function joinQueue(interaction, modo, valor) {
  if (blockSpam(interaction.user.id)) return;

  const key = `queue:${modo}:${valor}`;
  const exists = await redis.lrange(key, 0, -1);
  if (exists.includes(interaction.user.id)) {
    return interaction.reply({ content: '⚠️ Você já está na fila.', ephemeral: true });
  }

  await redis.rpush(key, interaction.user.id);
  await interaction.reply({ content: '✅ Entrou na fila.', ephemeral: true });

  await tryCreateMatch(interaction.guild, modo, valor);
}

export async function leaveQueue(interaction, modo, valor) {
  const key = `queue:${modo}:${valor}`;
  await redis.lrem(key, 0, interaction.user.id);
  await interaction.reply({ content: '❌ Saiu da fila.', ephemeral: true });
}

async function tryCreateMatch(guild, modo, valor) {
  const players = await redis.lrange(`queue:${modo}:${valor}`, 0, -1);
  const mediatorId = await redis.lpop('mediators');
  if (players.length < 2 || !mediatorId) return;

  const p1 = players.shift();
  const p2 = players.shift();
  await redis.ltrim(`queue:${modo}:${valor}`, 2, -1);

  const matchId = createMatchId();

  const channel = await guild.channels.create({
    name: `🎮-apostado-${modo}-R$${valor}`,
    type: ChannelType.GuildText,
    topic: `${matchId}:${mediatorId}`,
    permissionOverwrites: [
      { id: guild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] },
      { id: p1, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
      { id: p2, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
      { id: mediatorId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
      { id: guild.members.me.id, allow: [PermissionsBitField.Flags.ViewChannel] }
    ]
  });

  await channel.send({ content: `<@${p1}> <@${p2}> <@${mediatorId}>`, ...ticketEmbed(modo, valor) });
  startConfirmTimeout(channel, matchId);
  log(guild, `🎮 Sala criada ${modo} R$${valor}`);
}
