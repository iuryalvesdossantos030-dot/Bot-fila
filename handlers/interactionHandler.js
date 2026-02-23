export default async function interactionHandler(interaction) {
  try {
    // ================= BOTÕES =================
    if (interaction.isButton()) {
      const { customId } = interaction;

      // Fila
      if (customId.startsWith('fila_')) {
        return handleFila(interaction);
      }

      // Mediador
      if (customId.startsWith('mediador_')) {
        return handleMediador(interaction);
      }

      // Confirmação Pix
      if (customId.startsWith('pix_')) {
        return handlePix(interaction);
      }

      return;
    }

    // ================= SELECT MENU =================
    if (interaction.isStringSelectMenu()) {
      return;
    }

    // ================= MODAL =================
    if (interaction.isModalSubmit()) {
      return;
    }

  } catch (err) {
    console.error('❌ Erro no interactionHandler:', err);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: '❌ Erro interno.',
        ephemeral: true
      });
    }
  }
}

// ================= HANDLERS PLACEHOLDER =================
async function handleFila(interaction) {
  await interaction.reply({
    content: '⏳ Você entrou na fila.',
    ephemeral: true
  });
}

async function handleMediador(interaction) {
  await interaction.reply({
    content: '⚖️ Você entrou na fila de mediadores.',
    ephemeral: true
  });
}

async function handlePix(interaction) {
  await interaction.reply({
    content: '💳 Pix registrado.',
    ephemeral: true
  });
}
