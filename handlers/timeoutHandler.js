// handlers/timeoutHandler.js
import redis from '../services/redis.js';

export function startConfirmTimeout(channel, matchId) {
  setTimeout(async () => {
    try {
      const confirms = await redis.smembers(`confirm:${matchId}`);

      if (confirms.length < 2) {
        await channel.send('❌ Partida cancelada por falta de confirmação.');
        await channel.delete().catch(() => {});
      }
    } catch (err) {
      console.error('Erro no startConfirmTimeout:', err);
    }
  }, 180000); // 3 minutos
}
