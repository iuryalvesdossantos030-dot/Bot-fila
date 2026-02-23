import Database from 'better-sqlite3';

const db = new Database('damon.db');

db.prepare(`
CREATE TABLE IF NOT EXISTS ranking (
  user_id TEXT PRIMARY KEY,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  matches INTEGER DEFAULT 0
)
`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS mediators_pix (
  user_id TEXT PRIMARY KEY,
  pix_key TEXT,
  pix_type TEXT,
  message TEXT
)
`).run();

export default db;
