const fs = require('fs');

const file = './data.json';

function read() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(file));
}

function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
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
  setPix,
  getPix
};
