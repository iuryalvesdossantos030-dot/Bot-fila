import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export function ticketEmbed(modo, valor) {
  return {
    embeds: [
      new EmbedBuilder()
        .setColor(0x2f3136)
        .setTitle('⚖️ Damon Apostas — Mediação')
        .setDescription(`Modo: ${modo}\nValor: R$${valor}\nStatus: Aguardando confirmação`)
    ],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('confirm_presence').setLabel('Confirmar presença').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('cancel_match').setLabel('Cancelar').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('finalize_match').setLabel('Finalizar').setStyle(ButtonStyle.Secondary)
      )
    ]
  };
}
