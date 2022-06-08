import * as express from 'express';
import { Cat, CatType } from './cats.model';
import { Router } from 'express';

const router = Router();

// *READ: GetAll
router.get('/cats', (request: express.Request, response: express.Response) => {
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
router.get(
  '/cats/:id',
  (request: express.Request, response: express.Response) => {
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
  }
);

// *CREATE
router.post('/cats', (request: express.Request, response: express.Response) => {
  try {
    const data = request.body;
    console.log(data);
    Cat.push(data); // create
    response.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    response.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

export default router;
