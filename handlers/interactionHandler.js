import { entrarFila } from './filaHandler.js';
import { escolherVencedor } from './vencedorHandler.js';

export default async function interactionHandler(interaction) {
  if (!interaction.isButton()) return;

  if (interaction.customId.startsWith('fila_')) {
    return entrarFila(interaction);
  }

  if (interaction.customId.startsWith('vencedor_')) {
    return escolherVencedor(interaction);
  }

  if (interaction.customId === 'pix_confirmar') {
    return interaction.reply({
      content: '✅ Pagamento confirmado.',
      ephemeral: true
    });
  }
}
