import express from 'express';
import path from 'path';

import statsRouter from './routers/api/v1/stats';

const port = 3000;

const app = express();

app.use(express.json());

app.use('/api/v1/stats', statsRouter);
app.get('/login', (req, res) => {
  if (req.headers['cookie']?.includes('_plausible_key=abc123')) {
    return res.redirect('/sites');
  }
  return res.sendFile(path.join(__dirname, 'static', 'login-static.html'));
});
app.post('/login', (req, res) => {
  if (
    req.body.email !== 'user@example.com' ||
    req.body.password !== 'password' ||
    req.body._csrf_token !==
      'QFpOXGl-C2UIcFBhAgA1Ny9MFCFwCAUNu09-P1rRL24YOSlGC6vg8a_Y'
  ) {
    return res.sendStatus(401);
  }

  res
    .setHeader(
      'set-cookie',
      '_plausible_key=abc123; path=/; expires=Fri, 24 Mar 2028 13:48:51 GMT; max-age=157680000; HttpOnly; SameSite=Lax',
    )
    .sendStatus(204);
});
app.post('/settings/api-keys', (req, res) => {
  res.sendStatus(204);
});

// Health check endpoint used by start-server-and-test
app.head('/', (req, res) => {
  res.sendStatus(200);
});

app.use(express.static(path.join(__dirname, 'static'), {extensions: ['html']}));

app.use((req, res) => {
  console.warn(`Unhandled route: ${req.method} ${req.url}`);
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Plausible mocking server listening on ${port}`);
});
