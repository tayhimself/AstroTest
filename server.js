import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);
app.use((req, res, next) => {
    const chunks = [];
    const originalWrite = res.write;
    const originalEnd = res.end;

    res.write = (chunk, ...args) => {
      chunks.push(chunk);
      return true;
    };

    res.end = (chunk, ...args) => {
      if (chunk) {
        chunks.push(chunk);
      }
      const body = Buffer.concat(chunks).toString('utf8');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.write = originalWrite;
      res.end = originalEnd;
      res.end(body, ...args);
    };

    next();
  });


app.listen(4321);