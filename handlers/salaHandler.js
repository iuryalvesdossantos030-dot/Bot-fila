import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} from 'discord.js';

export async function criarSalaPrivada(guild, players, mediadorId) {
  try {
    // 🔒 Criar canal privado
    const canalTexto = await guild.channels.create({
      name: `partida-${players[0].username}-vs-${players[1].username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: players[0].id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: players[1].id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: mediadorId,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    });

    // 🎖️ Mensagem com botões do vencedor
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

  } catch (error) {
    console.error('Erro ao criar sala privada:', error);
  }
}
