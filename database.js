const fs = require('fs');

const file = './data.json';

function ensureFile() {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({
      pix: null,
      filas: {},
      ranking: {},
      historico: []
    }, null, 2));
  }
}

function load() {
  ensureFile();
  return JSON.parse(fs.readFileSync(file));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function all() {
  return load();
}

function get(key) {
  const data = load();
  return data[key];
}

function set(key, value) {
  const data = load();
  data[key] = value;
  save(data);
}

function setPix(key) {
  set('pix', key);
}

function getPix() {
  return get('pix');
}

module.exports = {
  load,
  save,
  all,
  get,
  set,
  setPix,
  getPix
};
