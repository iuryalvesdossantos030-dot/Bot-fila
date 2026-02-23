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

// ================= COMMANDS =================
client.commands = new Collection();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = (await import(filePath)).default;

  if (command?.data && command?.execute) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
}

// ================= REGISTER SLASH =================
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔄 Registrando comandos slash...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
})();

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
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: '❌ Erro ao executar o comando.',
        ephemeral: true
      });
    }
  }

  // Botões / selects / modals
  await interactionHandler(interaction);
});

// ================= START =================
keepAlive();
client.login(process.env.TOKEN);
