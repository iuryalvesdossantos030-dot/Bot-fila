const config = require("../config.json")

function isOwner(userId) {
  return userId === config.ownerId
}

function isAdmin(member) {
  return member.roles.cache.has(config.cargoAdmin)
}

module.exports = { isOwner, isAdmin }
