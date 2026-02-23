import { PermissionsBitField, ChannelType } from 'discord.js';
import redis from '../utils/redis.js';
import { enviarPix } from './pixHandler.js';

export async function criarSalaPrivada(guild, players, mediadorId, client) {
  const categoria = guild.channels.cache.find(
    c => c.name.toLowerCase().includes('apostas') && c.type === ChannelType.GuildCategory
  );

  // TEXTO
  const canalTexto = await guild.channels.create({
    name: `🎮｜${players[0].username}-vs-${players[1].username}`,
    type: ChannelType.GuildText,
    parent: categoria?.id,
    permissionOverwrites: [
      {
        id: guild.roles.everyone.id,
        deny: [PermissionsBitField.Flags.ViewChannel]
      },
      ...players.map(p => ({
        id: p.id,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
      })),
      {
        id: mediadorId,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
      }
    ]
  });

  // VOZ
  const canalVoz = await guild.channels.create({
    name: `🔊 ${players[0].username} vs ${players[1].username}`,
    type: ChannelType.GuildVoice,
    parent: categoria?.id,
    permissionOverwrites: canalTexto.permissionOverwrites.cache.map(p => ({
      id: p.id,
      allow: p.allow,
      deny: p.deny
    }))
  });

  import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js';

await canalTexto.send({
  content: '🎖️ **MEDIADOR:** selecione o vencedor da partida',
  components: [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`vencedor_${players[0].id}`)
        .setLabel(`Vitória ${players[0].username}`)
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId(`vencedor_${players[1].id}`)
        .setLabel(`Vitória ${players[1].username}`)
        .setStyle(ButtonStyle.Primary)
    )
  ]
});
