const { Client, GatewayIntentBits } = require("discord.js")
const config = require("./config.json")
const painelPrincipal = require("./panels/painelPrincipal")
const buttons = require("./interactions/buttons")

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})

buttons(client)

client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "painel")
      painelPrincipal(interaction)
  }
})
console.log("Comandos registrados automaticamente!");
client.login(config.token)
