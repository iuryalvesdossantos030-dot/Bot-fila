import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export function mediatorQueueEmbed(list) {
  return {
    embeds: [
      new EmbedBuilder()
        .setColor(0x2f3136)
        .setTitle('⚖️ Fila de Mediadores')
        .setDescription(list.length ? list.map(id=>`• <@${id}>`).join('\n') : 'Nenhum mediador disponível')
    ],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('mediator_join').setLabel('Entrar na fila').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('mediator_leave').setLabel('Sair da fila').setStyle(ButtonStyle.Danger)
      )
    ]
  };
}
