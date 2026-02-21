const db = require('../database');

function criarFila(nome, modo, valor, imagem) {
  const data = db.load();
  data.filas[nome] = {
    modo,
    valor,
    imagem,
    jogadores: [],
    confirmados: []
  };
  db.save(data);
}

function entrarFila(nome, userId) {
  const data = db.load();
  if (!data.filas[nome].jogadores.includes(userId)) {
    data.filas[nome].jogadores.push(userId);
  }
  db.save(data);
}

function confirmar(nome, userId) {
  const data = db.load();
  if (!data.filas[nome].confirmados.includes(userId)) {
    data.filas[nome].confirmados.push(userId);
  }
  db.save(data);
}

module.exports = { criarFila, entrarFila, confirmar };
