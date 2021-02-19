const db = require('../../data/dbConfig');

module.exports = {
  get,
  post,
};

function get() {
  return db('projects');
}

function post(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => {
      return db('projects').where('project_id', id).first();
    });
}
