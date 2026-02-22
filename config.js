import 'dotenv/config';

export default {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  redisUrl: process.env.REDIS_URL,
  embedColor: 0x2f3136,
  valores: [1,2,3,5,10,20,50,100],
  modos: ['1x1','2x2','3x3','4x4']
};
