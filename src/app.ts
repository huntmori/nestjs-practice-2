import * as express from 'express';
const app: express.Express = express();
const port: number = 3000;

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

app.listen(port, () => {
  console.log(`example app run on http://localhost:${port}`);
});
