const db = require("../utils/database")

function esta(userId) {
  return db.load().blacklist.includes(userId)
}

module.exports = { esta }
