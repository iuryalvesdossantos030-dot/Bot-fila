import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import config from '../config.js';

export function queueEmbed(modo, valor, players=[]) {
  return {
    embeds: [
      new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`Fila — ${modo}`)
        .setDescription(
          `💰 Valor: R$${valor}\n🎮 Modo: ${modo}\n\n👥 Participantes\n` +
          (players.length ? players.map(p=>`• <@${p}>`).join('\n') : 'Sem participantes')
        )
    ],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`join_${modo}_${valor}`).setLabel('Entrar na fila').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId(`leave_${modo}_${valor}`).setLabel('Sair da fila').setStyle(ButtonStyle.Danger)
      )
    ]
  };
}
