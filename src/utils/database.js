const fs = require("fs")
const path = "./src/database.json"

function load() {
  return JSON.parse(fs.readFileSync(path))
}

function save(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

module.exports = { load, save }
