const fs = require('fs');

const file = './data.json';

function read() {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({
      pix: null,
      filas: {},
      ranking: {}
    }));
  }
  return JSON.parse(fs.readFileSync(file));
}

function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function get() {
  return read();
}

function set(data) {
  write(data);
}

function setPix(key) {
  const data = read();
  data.pix = key;
  write(data);
}

function getPix() {
  const data = read();
  return data.pix;
}

module.exports = {
  get,
  set,
  setPix,
  getPix
};
