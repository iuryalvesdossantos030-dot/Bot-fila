import { entrarFila } from './filaHandler.js';
import { entrarMediador } from './mediadorHandler.js';

export default async function interactionHandler(interaction) {
  try {
    if (!interaction.isButton()) return;

    const { customId } = interaction;

    if (customId.startsWith('fila_')) {
      return entrarFila(interaction);
    }

    if (customId === 'mediador_entrar') {
      return entrarMediador(interaction);
    }

  } catch (err) {
    console.error('❌ interactionHandler erro:', err);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: '❌ Erro interno no sistema.',
        ephemeral: true
      });
    }
  }
}
