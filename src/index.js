const { 
    Client, 
    GatewayIntentBits, 
    SlashCommandBuilder, 
    Routes 
} = require('discord.js');

const { REST } = require('@discordjs/rest');

const painelPrincipal = require("./panels/painelPrincipal");
const buttons = require("./interactions/buttons");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// ===============================
// VARIÁVEIS DO RAILWAY
// ===============================
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

// ===============================
// REGISTRO AUTOMÁTICO DE COMANDOS
// ===============================
const commands = [
    new SlashCommandBuilder()
        .setName('painel')
        .setDescription('Abre o painel principal'),

    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde com Pong!')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log("🔄 Registrando comandos...");

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );

        console.log("✅ Comandos registrados com sucesso.");
    } catch (error) {
        console.error(error);
    }
})();

// ===============================
// EVENTOS
// ===============================
buttons(client);

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'painel') {
        await painelPrincipal(interaction);
    }

    if (interaction.commandName === 'ping') {
        await interaction.reply('🏓 Pong!');
    }
});

client.once('ready', () => {
    console.log(`✅ Bot online como ${client.user.tag}`);
});

// ===============================
client.login(process.env.TOKEN);
