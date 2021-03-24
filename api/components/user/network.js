const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const lista = await controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await controller.get(req.params.id);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await controller.upsert(req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.put('/', secure('update'), async (req, res, next) => {
  try {
    const user = await controller.upsert(req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
