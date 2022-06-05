import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express();
const port: number = 3001;

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.rawHeaders[1]);
    console.log('this is logging middleware');
    next();
  }
);

app.get(
  /** /cats/som */
  '/cats/som',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('this is som middleware');
    next();
  }
);

app.get('/', (req: express.Request, res: express.Response) => {
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

app.get('/cats/blue', (req: express.Request, res: express.Response) => {
  res.send({ blue: Cat[0] });
});

app.get('/cats/som', (req: express.Request, res: express.Response) => {
  res.send({ som: Cat[1] });
});

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({ error: '404 not found' });
  }
);

app.listen(port, () => {
  console.log(`example app run on http://localhost:${port}`);
});
