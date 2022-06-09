import * as express from 'express';
import { Cat, CatType } from './cats.model';
import { Router } from 'express';

const router = Router();

// *READ: GetAll
export const readAllCat = (
  request: express.Request,
  response: express.Response
) => {
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
};

// *READ: GetOne
export const readOneCat = (
  request: express.Request,
  response: express.Response
) => {
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
};

// *CREATE
export const createCat = (
  request: express.Request,
  response: express.Response
) => {
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
};

// *UPDATE : 고양이 데이터 업데이트 -> PUT
export const updatePutCat = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params = request.params;
    const body = request.body;
    let result;

    Cat.forEach(function (cat) {
      if (cat.id === params.id) {
        cat = body;
        result = cat;
      }
    });
    response.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error: any) {
    response.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
// *UPDATE : 고양이 데이터 부분적으로 업데이트 -> PATCH

export const patchCat = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params = request.params;
    const body = request.body;
    let result;

    Cat.forEach(function (cat) {
      if (cat.id === params.id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });
    response.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error: any) {
    response.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
// *DELETE : 고양이 데이터 삭제 -> DELETE

export const deleteCat = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params = request.params;
    const body = request.body;

    const newCat = Cat.filter((cat) => cat.id !== params.id);
    response.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (error: any) {
    response.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
