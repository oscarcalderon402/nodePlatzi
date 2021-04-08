const express = require('express');
const secure = require('../user/secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await controller.list();
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await controller.get(req.params.id);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', secure('post'), async (req, res, next) => {
  try {
    const data = await controller.upsert(
      req.body.id,
      req.body.text,
      req.user.data.id
    );
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
