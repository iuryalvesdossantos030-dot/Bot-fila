const db = require('../database');
const QRCode = require('qrcode');
const { Pix } = require('pix-payload');
const config = require('../config.json');

module.exports = async (interaction) => {

  if (interaction.customId === "gerar_pix") {

    const chave = await db.get("pix");
    if (!chave)
      return interaction.reply({ content: "Nenhuma chave cadastrada.", ephemeral: true });

    const pix = Pix({
      key: chave,
      name: config.nomeLoja,
      city: config.cidade,
      value: config.valor
    });

    const payload = pix.payload();
    const qr = await QRCode.toBuffer(payload);

    await interaction.channel.send({
      content: "💰 Pagamento via PIX",
      files: [{ attachment: qr, name: "pix.png" }]
    });

  }

};
