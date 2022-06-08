import * as express from 'express';
import { Cat, CatType } from './cats/cats.model';
import catsRouter from './cats/cats.route';

class Server {
  public app: express.Application;
  public port: number = 3001;
  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRouter() {
    // router 사용 미들웨어
    this.app.use(catsRouter);
  }

  private setMidleware() {
    /** logging middleware */
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log(req.rawHeaders[1]);
        console.log('this is logging middleware');
        next();
      }
    );

    // *json middleware
    this.app.use(express.json());
    this.setRouter();
    /** 404 middleware */
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.send({ error: '404 not found' });
      }
    );
  }

  public listen() {
    this.setMidleware();
    this.app.listen(this.port, () => {
      console.log(`example app run on http://localhost:${this.port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
