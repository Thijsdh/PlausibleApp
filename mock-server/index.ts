import express from 'express';
import path from 'path';

import statsRouter from './routers/api/v1/stats';

const port = 3000;

const app = express();

app.use('/api/v1/stats', statsRouter);
app.post('/login', (req, res) => {
  res
    .setHeader(
      'set-cookie',
      '_plausible_key=abc123; path=/; expires=Fri, 24 Mar 2028 13:48:51 GMT; max-age=157680000; HttpOnly; SameSite=Lax',
    )
    .sendStatus(204);
});
app.post('/settings/api-keys', (req, res) => {
  res.send(204).end();
});
app.use(express.static(path.join(__dirname, 'static'), {extensions: ['html']}));

app.use((req, res) => {
  console.warn(`Unhandled route: ${req.method} ${req.url}`);
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Plausible mocking server listening on ${port}`);
});
