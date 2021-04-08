const { nanoid } = require('nanoid');
const TABLA = 'post';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }
  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  async function upsert(id, text, user) {
    const post = {
      text: text,
      user: user,
    };

    if (!!id) {
      post.id = id;
    } else {
      post.id = nanoid();
    }

    return store.upsert(TABLA, post);
  }

  function remove(id) {
    return store.get(TABLA, id);
  }

  return {
    list,
    get,
    upsert,
    remove,
  };
};
