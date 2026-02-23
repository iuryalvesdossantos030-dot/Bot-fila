// handlers/pixHandler.js
import db from '../services/database.js';

export async function sendPixMessage(channel) {
  await channel.send({
    content:
`💳 **PAGAMENTO VIA PIX**

SO ACEITAMOS PIX COM COMPROVANTE
❌ NÃO ACEITAMOS PICPAY
❌ NÃO ACEITAMOS INTER
❌ NÃO ACEITAMOS MERCADO PAGO`
  });
}
