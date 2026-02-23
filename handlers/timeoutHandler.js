// handlers/timeoutHandler.js

export async function handleQueueTimeout({
  redis,
  queueKey,
  userId,
  channel
}) {
  try {
    // remove usuário da fila após timeout
    await redis.lrem(queueKey, 0, userId);

    if (channel) {
      await channel.send(
        `⏱️ <@${userId}> saiu da fila por tempo limite.`
      );
    }
  } catch (err) {
    console.error("Erro no timeoutHandler:", err);
  }
}
