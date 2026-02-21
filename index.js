require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

function isOwner(interaction) {
  return interaction.guild.ownerId === interaction.user.id;
}

function isStaff(interaction) {
  return interaction.member.roles.cache.has(process.env.STAFF_ROLE_ID);
}

client.on('interactionCreate', async interaction => {

  // SLASH COMMANDS
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, null, isOwner, isStaff);
    } catch (error) {
      console.error(error);
    }
  }

  // BOTÕES DO PAINEL
  if (interaction.isButton()) {

    if (interaction.customId === 'criar_fila')
      return interaction.reply({ content: 'Use /fila para criar.', ephemeral: true });

    if (interaction.customId === 'editar_fila')
      return interaction.reply({ content: 'Use /configfila para editar.', ephemeral: true });

    if (interaction.customId === 'alterar_pix')
      return interaction.reply({ content: 'Use /setpix para alterar.', ephemeral: true });

    if (interaction.customId === 'ranking')
      return interaction.reply({ content: 'Use /ranking.', ephemeral: true });

    if (interaction.customId === 'historico')
      return interaction.reply({ content: 'Use /historico.', ephemeral: true });

    if (interaction.customId === 'reset_ranking')
      return interaction.reply({ content: 'Ranking resetado.', ephemeral: true });
  }

});

client.once('ready', () => {

  console.log("Comandos registrados automaticamente!");
});

client.login(process.env.TOKEN);
