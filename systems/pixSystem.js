function gerarMensagemPix(valor) {
  return `💰 Pagamento via PIX
Valor: R$${valor},00

Chave PIX: sua-chave-aqui

⚠️ Só aceitamos pagamento com comprovante.`;
}

module.exports = { gerarMensagemPix };
