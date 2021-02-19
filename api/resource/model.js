const db = require('../../data/dbConfig');

module.exports = {
  get,
  post,
};

function get() {
  return db('resources');
}

function post(project) {
  return db('resources')
    .insert(project)
    .then(([id]) => {
      return db('resources').where('resource_id', id).first();
    });
}
