const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS filas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guild TEXT,
    modo TEXT,
    jogador TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ranking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guild TEXT,
    jogador TEXT,
    elo INTEGER DEFAULT 1000,
    partidas INTEGER DEFAULT 0,
    vitorias INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS pix (
    guild TEXT PRIMARY KEY,
    chave TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS historico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guild TEXT,
    descricao TEXT,
    data TEXT
  )`);

});

module.exports = db;
