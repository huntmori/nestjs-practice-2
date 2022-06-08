import * as express from 'express';
import { Cat, CatType } from './cats/cats.model';
import catsRouter from './cats/cats.route';

const app: express.Express = express();
const port: number = 3001;

/** logging middleware */
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.rawHeaders[1]);
    console.log('this is logging middleware');
    next();
  }
);

// *json middleware
app.use(express.json());

// router 사용 미들웨어
app.use(catsRouter);

/** 404 middleware */
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({ error: '404 not found' });
  }
);

app.listen(port, () => {
  console.log(`example app run on http://localhost:${port}`);
});
