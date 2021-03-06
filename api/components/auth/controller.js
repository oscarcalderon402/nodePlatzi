const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });

    const equals = await bcrypt.compare(password, data.password);
    console.log(data);
    console.log('[test]', equals);
    if (!equals) {
      throw new Error('informacion invalida');
    } else {
      //token
      return auth.sign({ data });
    }
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }
    return store.upsert(TABLA, authData);
  }
  return {
    upsert,
    login,
  };
};
