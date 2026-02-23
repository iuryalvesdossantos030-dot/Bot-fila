import { Client, GatewayIntentBits, REST, Routes, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import interactionHandler from './handlers/interactionHandler.js';
import { keepAlive } from './keepAlive.js';

// ✅ DEBUG (depois dos imports)
console.log('Import interactionHandler:', interactionHandler);
console.log('TOKEN:', process.env.TOKEN);
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('GUILD_ID:', process.env.GUILD_ID);

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

// ================= LOAD COMMANDS =================
async function loadCommands() {
  const commands = [];
  const commandsPath = path.join(__dirname, 'commands');

  if (!fs.existsSync(commandsPath)) {
    console.log('⚠️ Pasta commands não encontrada');
    return;
  }

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandModule = await import(filePath);
    const command = commandModule.default;

    if (!command?.data || !command?.execute) {
      console.log(`⚠️ Comando inválido ignorado: ${file}`);
      continue;
    }

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }

  // ===== REGISTER SLASH COMMANDS (GUILD) =====
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  );

  console.log('✅ Slash commands registrados com sucesso');
}

// ================= READY =================
client.once('clientReady', () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// ================= INTERACTIONS =================
client.on('interactionCreate', async interaction => {
  try {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      return await command.execute(interaction);
    }

    if (
      interaction.isButton() ||
      interaction.isStringSelectMenu() ||
      interaction.isModalSubmit()
    ) {
      return await interactionHandler(interaction);
    }

  } catch (err) {
    console.error('❌ Erro na interactionCreate:', err);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: '❌ Erro interno no bot.',
        ephemeral: true
      });
    }
  }
});

// ================= START =================
(async () => {
  try {

    if (!process.env.TOKEN) {
      throw new Error('TOKEN não definido nas variáveis da Railway');
    }

    if (!process.env.CLIENT_ID) {
      throw new Error('CLIENT_ID não definido');
    }

    if (!process.env.GUILD_ID) {
      throw new Error('GUILD_ID não definido');
    }

    await loadCommands();
    keepAlive();
    await client.login(process.env.TOKEN);

    console.log('🚀 Bot iniciado com sucesso');

  } catch (err) {
    console.error('❌ Erro ao iniciar o bot:', err);
  }
})();
