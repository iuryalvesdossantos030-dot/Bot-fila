import { Client, GatewayIntentBits } from 'discord.js';
import config from './config.js';
import interactionHandler from './handlers/interactionHandler.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.once('ready', () => {
  console.log(`✅ Bot Damon online: ${client.user.tag}`);
});

client.on('interactionCreate', interactionHandler);

client.login(config.token);
