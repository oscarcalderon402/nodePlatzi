const mysql = require('mysql');

const config = require('../config');

const dbconf = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('DB Connected');
    }
  });

  connection.on('error', (err) => {
    console.error('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    console.log(
      `GOING TO MAKE AN INSERT INTO TABLE: ${table} with data: ${data}`
    );
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) {
        console.error('### ERR ###: ', err);
        return reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    console.log('DATA TO BE UPDATED: ', data);
    connection.query(
      `UPDATE ${table} SET ? WHERE id= ?`,
      [data, data.id],
      (err, result) => {
        if (err) {
          console.error('UPDATE CANNOT BE DONE: ', err);
          return reject(err);
        } else {
          console.log('UPDATE DONE: ', result);
          resolve(result);
        }
      }
    );
  });
}

// function upsert(table, data) {
//   if (data && data.id) {
//     return update(table, data);
//   } else {
//     return insert(table, data);
//   }
// }
function upsert(table, data) {
  return insert(table, data);
}

function query(table, query, join) {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, res) => {
        if (err) return reject(err);
        resolve(res[0] || null);
      }
    );
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
