import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express();
const port: number = 3001;

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('req', req);
  console.log('res', res);
  res.send({
    title: 'crime city 2',
    primaryActor: 'dohn-lee',
    nation: 'korea',
    language: ['english', 'japaness', 'korean'],
  });
});

app.post('/test', (req: express.Request, res: express.Response) => {
  res.send({
    person: 'oliver',
  });
});

app.get('/cats', (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

app.listen(port, () => {
  console.log(`example app run on http://localhost:${port}`);
});
