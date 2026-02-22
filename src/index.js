const { 
    Client, 
    GatewayIntentBits, 
    SlashCommandBuilder, 
    Routes 
} = require('discord.js');

const { REST } = require('@discordjs/rest');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// ====== CONFIG ======
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID; // ID da aplicação
const guildId = process.env.GUILD_ID;   // ID do servidor para registrar rápido

// ====== COMANDOS ======
const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde com Pong!'),

    new SlashCommandBuilder()
        .setName('painel')
        .setDescription('Abre o painel principal')
].map(command => command.toJSON());

// ====== REGISTRAR COMANDOS ======
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Registrando comandos...');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Comandos registrados com sucesso.');
    } catch (error) {
        console.error(error);
    }
})();

// ====== EVENTOS ======
client.once('ready', () => {
    console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('🏓 Pong!');
    }

    if (interaction.commandName === 'painel') {
        await interaction.reply('📋 Painel funcionando!');
    }
});

client.login(process.env.TOKEN);
