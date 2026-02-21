const { SlashCommandBuilder } = require('discord.js');
const { filas, criarFila } = require('../systems/queueManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('configurar')
    .setDescription('Configurar fila')
    .addStringOption(opt =>
      opt.setName('nome')
        .setDescription('Nome da fila')
        .setRequired(true))
    .addStringOption(opt =>
      opt.setName('modo')
        .setDescription('Modo')
        .addChoices(
          { name: '1v1', value: '1v1' },
          { name: '2v2', value: '2v2' },
          { name: '3v3', value: '3v3' },
          { name: '4v4', value: '4v4' }
        ))
    .addIntegerOption(opt =>
      opt.setName('valor')
        .setDescription('Valor da partida'))
    .addStringOption(opt =>
      opt.setName('imagem')
        .setDescription('URL da imagem')),

  async execute(interaction, db, isOwner) {

    if (!isOwner(interaction))
      return interaction.reply({ content: "❌ Apenas dono pode configurar.", ephemeral: true });

    const nome = interaction.options.getString('nome');
    const modo = interaction.options.getString('modo');
    const valor = interaction.options.getInteger('valor');
    const imagem = interaction.options.getString('imagem');

    criarFila(nome);
    const fila = filas.get(nome);

    if (modo) fila.modo = modo;
    if (valor) fila.valor = valor;
    if (imagem) fila.imagem = imagem;

    interaction.reply(`✅ Fila **${nome}** configurada.`);
  }
};
