const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const db = require('./database');

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

  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, db, isOwner, isStaff);
  } catch (error) {
    console.error(error);
  }
});

client.once('ready', async () => {
  console.log(`Logado como ${client.user.tag}`);

  const commands = [];
  const commandFiles = fs.readdirSync('./commands');

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  await client.guilds.cache.get(process.env.GUILD_ID)?.commands.set(commands);

  console.log("Comandos registrados automaticamente!");
});
client.login(process.env.TOKEN);
