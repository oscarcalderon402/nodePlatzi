module.exports = {
  api: {
    port: process.env.API_PORT || 4000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret!',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'vLmEwdTFOj',
    password: process.env.MYSQL_PASS || 'mQryGOWfAD',
    database: process.env.MYSQL_DB || 'vLmEwdTFOj',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || '3001',
  },
};
