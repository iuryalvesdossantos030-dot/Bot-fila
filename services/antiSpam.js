const cooldown = new Set();

export function blockSpam(userId, time = 3000) {
  if (cooldown.has(userId)) return true;
  cooldown.add(userId);
  setTimeout(() => cooldown.delete(userId), time);
  return false;
}
