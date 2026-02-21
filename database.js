const fs = require('fs');

const path = './data.json';

if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify({
    filas: {},
    ranking: {},
    historico: [],
    pix: "Não definida"
  }, null, 2));
}

function load() {
  return JSON.parse(fs.readFileSync(path));
}

function save(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { load, save };
