// handlers/finalizeHandler.js
export async function finalizeMatch(interaction) {
  await interaction.reply({
    content: '🏁 Partida finalizada pelo mediador.',
    ephemeral: true
  });
}
