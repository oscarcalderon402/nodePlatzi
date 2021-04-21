const express = require('express');

const config = require('../config');

const app = express();

app.use(express.json());

//rutas

app.listen(config.mysqlService.port, () => {
  console.log(
    `Servicio de mysql escuchando en el puerto`,
    config.mysqlService.port
  );
});
