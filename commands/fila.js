const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { criarFila } = require('../systems/queueManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fila')
    .setDescription('Criar fila')
    .addStringOption(opt =>
      opt.setName('nome').setDescription('Nome da fila').setRequired(true))
    .addStringOption(opt =>
      opt.setName('modo')
        .setDescription('Modo')
        .setRequired(true)
        .addChoices(
          { name: '1v1', value: '1v1' },
          { name: '2v2', value: '2v2' },
          { name: '3v3', value: '3v3' },
          { name: '4v4', value: '4v4' }
        ))
    .addIntegerOption(opt =>
      opt.setName('valor').setDescription('Valor em R$').setRequired(true))
    .addStringOption(opt =>
      opt.setName('imagem').setDescription('URL da imagem').setRequired(true)),

  async execute(interaction, db, isOwner) {

    if (!isOwner(interaction))
      return interaction.reply({ content: '❌ Apenas o DONO pode usar.', ephemeral: true });

    const nome = interaction.options.getString('nome');
    const modo = interaction.options.getString('modo');
    const valor = interaction.options.getInteger('valor');
    const imagem = interaction.options.getString('imagem');

    criarFila(nome, modo, valor, imagem);

    const embed = new EmbedBuilder()
      .setTitle(`🎮 Fila ${nome}`)
      .setDescription(`Modo: ${modo}\n💰 Valor: R$${valor},00`)
      .setImage(imagem)
      .setColor("Green");

    await interaction.reply({ embeds: [embed] });
  }
};
