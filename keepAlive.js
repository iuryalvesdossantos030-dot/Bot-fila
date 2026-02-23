import express from 'express';

export function keepAlive() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    res.send('Bot online');
  });

  app.listen(PORT, () => {
    console.log(`🌐 KeepAlive rodando na porta ${PORT}`);
  });
}
