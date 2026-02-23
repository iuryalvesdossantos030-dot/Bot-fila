import db from '../services/database.js';

export function addWin(userId) {
  db.prepare(`
    INSERT INTO ranking (user_id, wins, matches)
    VALUES (?, 1, 1)
    ON CONFLICT(user_id)
    DO UPDATE SET
      wins = wins + 1,
      matches = matches + 1
  `).run(userId);
}

export function addLoss(userId) {
  db.prepare(`
    INSERT INTO ranking (user_id, losses, matches)
    VALUES (?, 1, 1)
    ON CONFLICT(user_id)
    DO UPDATE SET
      losses = losses + 1,
      matches = matches + 1
  `).run(userId);
}

export function getTop10() {
  return db.prepare(`
    SELECT user_id, wins, losses, matches
    FROM ranking
    ORDER BY wins DESC
    LIMIT 10
  `).all();
}
