import redis from '../utils/redis.js';

export async function enviarPix(canal, mediadorId, client) {
  const pix = await redis.hgetall(`pix:${mediadorId}`);
  const mediador = await client.users.fetch(mediadorId);

  await canal.send({
    embeds: [{
      color: 0x00ff99,
      author: {
        name: mediador.username,
        icon_url: mediador.displayAvatarURL()
      },
      title: '💳 PAGAMENTO VIA PIX',
      description:
        `**Chave:** ${pix.chave || 'Não configurada'}\n\n` +
        `⚠️ **SO ACEITAMOS PIX COM COMPROVANTES**\n` +
        `❌ NÃO ACEITAMOS PICPAY, INTER, MERCADO PAGO`
    }],
    components: [{
      type: 1,
      components: [{
        type: 2,
        style: 3,
        label: 'Confirmar Pagamento',
        custom_id: 'pix_confirmar'
      }]
    }]
  });
}
