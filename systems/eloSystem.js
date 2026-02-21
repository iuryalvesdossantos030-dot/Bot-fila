const db = require('../database');

function atualizarElo(vencedores, perdedores) {
  const data = db.load();

  vencedores.forEach(id => {
    if (!data.ranking[id]) data.ranking[id] = 1000;
    data.ranking[id] += 25;
  });

  perdedores.forEach(id => {
    if (!data.ranking[id]) data.ranking[id] = 1000;
    data.ranking[id] -= 20;
  });

  db.save(data);
}

module.exports = { atualizarElo };
