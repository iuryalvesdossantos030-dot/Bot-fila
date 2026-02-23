// handlers/interactionHandler.js

import { joinQueue, leaveQueue } from './queueHandler.js';
import { joinMediator, leaveMediator } from './mediatorHandler.js';
import { confirmPresence } from './confirmHandler.js';
import { finalizeMatch } from './finalizeHandler.js';
import { sendPixMessage, configPix } from './pixHandler.js';
import { getTop10 } from './rankingHandler.js';
import { isOwner } from '../services/permissions.js';

export default async function interactionHandler(interaction) {

  /* =====================================================
     BOTÕES (BUTTON INTERACTIONS)
  ===================================================== */
  if (interaction.isButton()) {
    const id = interaction.customId;

    // 🎮 Entrar na fila (join_1x1_10, join_2x2_50 etc)
    if (id.startsWith('join_')) {
      const [, modo, valor] = id.split('_');
      return joinQueue(interaction, modo, valor);
    }

    // ❌ Sair da fila
    if (id.startsWith('leave_')) {
      const [, modo, valor] = id.split('_');
      return leaveQueue(interaction, modo, valor);
    }

    // ⚖️ Mediador entra na fila
    if (id === 'mediator_join') {
      return joinMediator(interaction);
    }

    // ⚖️ Mediador sai da fila
    if (id === 'mediator_leave') {
      return leaveMediator(interaction);
    }

    // ✅ Jogador confirma presença
    if (id === 'confirm_presence') {
      return confirmPresence(interaction);
    }

    // 🏁 Mediador finaliza a partida
    if (id === 'finalize_match') {
      return finalizeMatch(interaction);
    }

    // 💳 Mediador envia PIX manualmente (opcional)
    if (id === 'send_pix') {
      return sendPixMessage(interaction.channel);
    }
  }

  /* =====================================================
     SLASH COMMANDS (/commands)
  ===================================================== */
  if (interaction.isChatInputCommand()) {

    // 🏆 /ranking
    if (interaction.commandName === 'ranking') {
      const top = getTop10();

      if (!top.length) {
        return interaction.reply({
          content: '📉 Ainda não há partidas registradas.',
          ephemeral: true
        });
      }

      const rankingText = top.map((u, i) =>
        `#${i + 1} <@${u.user_id}> | 🏆 ${u.wins} | ❌ ${u.losses} | 🎮 ${u.matches}`
      ).join('\n');

      return interaction.reply({
        content: `🏆 **RANKING DAMON**\n\n${rankingText}`
      });
    }

    // 💳 /config-pix (mediador)
    if (interaction.commandName === 'config-pix') {
      return configPix(interaction);
    }

    // ⚙️ /painel (somente dono)
    if (interaction.commandName === 'painel') {
      if (!isOwner(interaction)) {
        return interaction.reply({
          content: '❌ Apenas o dono do servidor pode usar este comando.',
          ephemeral: true
        });
      }

      return interaction.reply({
        content: '⚙️ Painel do dono aberto.\n(Em breve opções avançadas)',
        ephemeral: true
      });
    }
  }
          }
