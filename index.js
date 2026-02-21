const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log('Bot online 🚀');
});

client.login(process.env.MTQ3NDU1NTkyNjI5NTA4OTE3Mg.Gd4MKc.uqFk3ErPBjV1J5YBLpf9zcm6qe3lrNblk2QMsc);
