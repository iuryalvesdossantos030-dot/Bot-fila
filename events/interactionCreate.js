const mediadorSystem = require('../systems/mediadorSystem');
const filaSystem = require('../systems/filaSystem');
const pixSystem = require('../systems/pixSystem');

module.exports = (client) => {

  client.on('interactionCreate', async interaction => {

    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
      }
    }

    if (interaction.isButton()) {
      await mediadorSystem(interaction);
      await filaSystem(interaction);
      await pixSystem(interaction);
    }

  });

};
