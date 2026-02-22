import { joinQueue, leaveQueue } from './queueHandler.js';
import { joinMediator, leaveMediator } from './mediatorHandler.js';
import { confirmPresence } from './confirmHandler.js';
import { finalizeMatch } from './finalizeHandler.js';

export default async function interactionHandler(interaction) {
  if (!interaction.isButton()) return;

  const id = interaction.customId;

  if (id.startsWith('join_')) {
    const [,modo,valor] = id.split('_');
    return joinQueue(interaction, modo, valor);
  }

  if (id.startsWith('leave_')) {
    const [,modo,valor] = id.split('_');
    return leaveQueue(interaction, modo, valor);
  }

  if (id === 'mediator_join') return joinMediator(interaction);
  if (id === 'mediator_leave') return leaveMediator(interaction);
  if (id === 'confirm_presence') return confirmPresence(interaction);
  if (id === 'finalize_match') return finalizeMatch(interaction);
}
