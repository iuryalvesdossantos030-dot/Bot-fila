import db from '../services/database.js';

export async function configPix(interaction) {
  const pix = interaction.options.getString('pix');
  const type = interaction.options.getString('type');
  const msg = interaction.options.getString('message') || '';

  db.prepare(`
    INSERT INTO mediators_pix (user_id, pix_key, pix_type, message)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id)
    DO UPDATE SET
      pix_key = excluded.pix_key,
      pix_type = excluded.pix_type,
      message = excluded.message
  `).run(interaction.user.id, pix, type, msg);

  await interaction.reply({
    content: '✅ PIX configurado com sucesso.',
    ephemeral: true
  });
}

export async function sendPixMessage(channel) {
  const mediator = channel.members.find(m => !m.user.bot);
  if (!mediator) return;

  const data = db.prepare(
    `SELECT * FROM mediators_pix WHERE user_id = ?`
  ).get(mediator.id);

  if (!data) {
    return channel.send('⚠️ Mediador sem PIX configurado.');
  }

  await channel.send({
    content: `
💳 **PIX DO MEDIADOR**

👤 ${mediator}
🔑 ${data.pix_type}: ${data.pix_key}

⚠️ SO ACEITAMOS PIX COM COMPROVANTE  
❌ NÃO ACEITAMOS PICPAY  
❌ NÃO ACEITAMOS INTER  
❌ NÃO ACEITAMOS MERCADO PAGO

${data.message}
    `
  });
}
