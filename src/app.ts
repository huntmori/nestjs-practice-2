import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express();
const port: number = 3001;

/**
 * logging middleware
 */
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.rawHeaders[1]);
    console.log('this is logging middleware');
    next();
  }
);

// *READ: GetAll
app.get('/cats', (request: express.Request, response: express.Response) => {
  try {
    const cats = Cat;
    response.status(200).send({
      success: true,
      cats,
    });
  } catch (error: any) {
    response.status(400).send({
      success: false,
      error: error.message,
    });
  }
});
// *READ: GetOne
app.get('/cats/:id', (request: express.Request, response: express.Response) => {
  try {
    const params = request.params;
    console.log('params', params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    response.status(200).send({
      success: true,
      cat,
    });
  } catch (error: any) {
    response.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

/**
 * 404 middleware
 */
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({ error: '404 not found' });
  }
);

app.listen(port, () => {
  console.log(`example app run on http://localhost:${port}`);
});
