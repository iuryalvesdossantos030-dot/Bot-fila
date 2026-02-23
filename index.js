import { Client, GatewayIntentBits, REST, Routes, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { keepAlive } from './keepAlive.js';
import interactionHandler from './handlers/interactionHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= CLIENT =================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.commands = new Collection();

// ================= LOAD + REGISTER COMMANDS =================
async function loadCommands() {
  const commands = [];
  const commandsPath = path.join(__dirname, 'commands');

  if (!fs.existsSync(commandsPath)) return;

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = (await import(filePath)).default;

    if (command?.data && command?.execute) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    }
  }

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  );

  console.log('✅ Slash commands registrados');
}

// ================= READY =================
client.once('clientReady', () => {
  console.log(`✅ Bot Damon online: ${client.user.tag}`);
});

// ================= INTERACTIONS =================
client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: '❌ Erro ao executar o comando.',
        ephemeral: true
      });
    }
  }

  // Botões / selects / modals
  if (
  interaction.isButton() ||
  interaction.isStringSelectMenu() ||
  interaction.isModalSubmit()
) {
  await interactionHandler(interaction);
  }

// ================= START =================
(async () => {
  await loadCommands();
  keepAlive();
  await client.login(process.env.TOKEN);
})();
