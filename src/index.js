const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");
const painelPrincipal = require("./panels/painelPrincipal");
const buttons = require("./interactions/buttons");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

buttons(client);

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "painel") {
      await painelPrincipal(interaction);
    }
  }
});

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(config.token);
