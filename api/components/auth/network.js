const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const token = await controller.login(req.body.username, req.body.password);
    console.log(token);
    response.success(req, res, token, 200);
  } catch (error) {
    // response.error(req, res, 'informacion invalida', 400);
    next(error);
  }
});

module.exports = router;
