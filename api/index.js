const express = require('express');

const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');
const errors = require('../network/errors');
const app = express();

const swaggerUi = require('swagger-ui-express');

app.use(express.json());
const swaggerDoc = require('./swagger.json');

//router
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Api escuchando en el puerto ${config.api.port}`);
});
