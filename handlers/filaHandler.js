import redis from '../utils/redis.js';
import { criarSalaPrivada } from './salaHandler.js';

export async function entrarFila(interaction) {
  const { customId, user, guild, client } = interaction;
  const [, modo, valor] = customId.split('_');

  const filaKey = `fila:${modo}:${valor}`;
  const mediadores = await redis.smembers('mediadores');

  if (!mediadores.length) {
    return interaction.reply({
      content: '❌ Nenhum mediador disponível no momento.',
      ephemeral: true
    });
  }

  await redis.rpush(filaKey, user.id);

  const fila = await redis.lrange(filaKey, 0, -1);

  if (fila.length < 2) {
    return interaction.reply({
      content: '⏳ Aguardando outro jogador...',
      ephemeral: true
    });
  }

  // REMOVE 2 PLAYERS DA FILA
  const p1 = fila[0];
  const p2 = fila[1];
  await redis.ltrim(filaKey, 2, -1);

  // PEGA MEDIADOR
  const mediadorId = mediadores[Math.floor(Math.random() * mediadores.length)];

  const players = [
    await client.users.fetch(p1),
    await client.users.fetch(p2)
  ];

  await interaction.reply({
    content: '🎮 Partida encontrada! Criando sala...',
    ephemeral: true
  });

  await criarSalaPrivada(guild, players, mediadorId, client);
}
