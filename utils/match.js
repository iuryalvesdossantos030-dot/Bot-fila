import crypto from 'crypto';

export function createMatchId() {
  return crypto.randomUUID();
    }
