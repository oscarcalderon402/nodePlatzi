const db = {};

function list(tabla) {
  return db[tabla];
}
function get(tabla, id) {}
function upsert(tabla, data) {}
function remove(tabla, id) {}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
