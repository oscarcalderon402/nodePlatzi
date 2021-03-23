const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const lista = await controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await controller.get(req.params.id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await controller.upsert(req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.put('/', secure('update'), async (req, res) => {
  try {
    const user = await controller.upsert(req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

module.exports = router;
