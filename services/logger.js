export async function log(guild, msg) {
  const channel = guild.channels.cache.find(c => c.name === 'logs-apostas');
  if (channel) channel.send(msg);
}
