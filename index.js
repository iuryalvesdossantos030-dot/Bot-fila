import { Client, GatewayIntentBits } from 'discord.js';
import { keepAlive } from './keepAlive.js';
import './handlers/interactionHandler.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('clientReady', () => {
  console.log(`✅ Bot Damon online: ${client.user.tag}`);
});
console.log("Comandos registrados automaticamente!");
});
keepAlive();
client.login(process.env.TOKEN);
