const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('painel')
    .setDescription('Painel central de controle'),

  async execute(interaction, db, isOwner) {

    if (!isOwner(interaction))
      return interaction.reply({ content: '❌ Apenas o DONO pode usar.', ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('🎛 Painel de Controle - Sistema de Filas')
      .setDescription(`
Gerencie todas as configurações do bot por aqui.

👑 Controle total do servidor
📊 Sistema profissional
⚙ Multi-filas
💰 Pix integrado
🏆 Ranking ELO
      `)
      .setColor("Green")
      .setFooter({ text: "Sistema Profissional de Filas" });

    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('criar_fila')
        .setLabel('🎮 Criar Fila')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('editar_fila')
        .setLabel('⚙ Editar Fila')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('alterar_pix')
        .setLabel('💳 Alterar Pix')
        .setStyle(ButtonStyle.Success)
    );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ranking')
        .setLabel('📊 Ranking')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('historico')
        .setLabel('📝 Histórico')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('reset_ranking')
        .setLabel('🗑 Reset Ranking')
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row1, row2]
    });
  }
};
