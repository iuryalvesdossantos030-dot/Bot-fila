const filas = new Map();

function criarFila(nome) {
  if (!filas.has(nome)) {
    filas.set(nome, {
      modo: "1v1",
      valor: 10,
      imagem: null,
      jogadores: [],
      confirmados: []
    });
  }
}

function entrarFila(nome, userId) {
  const fila = filas.get(nome);
  if (!fila.jogadores.includes(userId)) {
    fila.jogadores.push(userId);
  }
}

function sairFila(nome, userId) {
  const fila = filas.get(nome);
  fila.jogadores = fila.jogadores.filter(id => id !== userId);
}

function confirmar(nome, userId) {
  const fila = filas.get(nome);
  if (!fila.confirmados.includes(userId)) {
    fila.confirmados.push(userId);
  }
}

module.exports = {
  filas,
  criarFila,
  entrarFila,
  sairFila,
  confirmar
};
