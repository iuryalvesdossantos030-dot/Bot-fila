const QRCode = require("qrcode")

async function gerarQR(chave, valor) {
  const payload = `PIX:${chave}|VALOR:${valor}`
  const qr = await QRCode.toDataURL(payload)
  return qr
}

module.exports = { gerarQR }
