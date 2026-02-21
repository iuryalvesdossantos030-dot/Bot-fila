const { 
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const { filas, entrarFila, sairFila, confirmar } = require('../systems/queueManager');
const { criarSala } = require('../systems/matchSystem');
const { gerarMensagemPix } = require('../systems/pixSystem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fila')
    .setDescription('Abrir painel da fila')
    .addStringOption(opt =>
      opt.setName('nome')
        .setDescription('Nome da fila')
        .setRequired(true)),

  async execute(interaction) {

    const nome = interaction.options.getString('nome');
    const fila = filas.get(nome);

    if (!fila)
      return interaction.reply({ content: "❌ Fila não existe.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle(`🎮 Fila ${nome}`)
      .setDescription(`
Modo: ${fila.modo}
💰 Valor: R$${fila.valor},00

👥 Jogadores:
Nenhum jogador
`)
      .setImage(fila.imagem || null)
      .setColor("#2b2d31");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('entrar')
        .setLabel('🎮 Entrar')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('confirmar')
        .setLabel('✅ Confirmar')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('sair')
        .setLabel('❌ Sair')
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector();

    collector.on('collect', async i => {

      if (i.customId === 'entrar') {
        entrarFila(nome, i.user.id);
        await i.reply({ content: gerarMensagemPix(fila.valor), ephemeral: true });
      }

      if (i.customId === 'sair') {
        sairFila(nome, i.user.id);
      }

      if (i.customId === 'confirmar') {
        confirmar(nome, i.user.id);
      }

      const quantidade = parseInt(fila.modo[0]) * 2;

      if (fila.confirmados.length >= quantidade) {
        await criarSala(interaction.guild, fila.confirmados);
        fila.jogadores = [];
        fila.confirmados = [];
      }

      const lista = fila.jogadores.length > 0
        ? fila.jogadores.map(id => `<@${id}>`).join('\n')
        : "Nenhum jogador";

      embed.setDescription(`
Modo: ${fila.modo}
💰 Valor: R$${fila.valor},00

👥 Jogadores:
${lista}
`);

      await i.update({ embeds: [embed], components: [row] });

    });
  }
};
