import {
  readAllCat,
  readOneCat,
  createCat,
  deleteCat,
  patchCat,
} from './cats.service';
import * as express from 'express';
import { Cat, CatType } from './cats.model';
import { Router } from 'express';

const router = Router();

// *READ: GetAll
router.get('/cats', readAllCat);

// *READ: GetOne
router.get('/cats/:id', readOneCat);

// *CREATE
router.post('/cats', createCat);
// *UPDATE : 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch('/cats/:id', patchCat);
// *DELETE : 고양이 데이터 삭제 -> DELETE
router.delete('/cats/:id', deleteCat);

export default router;
