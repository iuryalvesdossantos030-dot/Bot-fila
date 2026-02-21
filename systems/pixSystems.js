const db = require('../database');

function setPix(chave) {
  const data = db.load();
  data.pix = chave;
  db.save(data);
}

function getPix() {
  return db.load().pix;
}

module.exports = { setPix, getPix };
