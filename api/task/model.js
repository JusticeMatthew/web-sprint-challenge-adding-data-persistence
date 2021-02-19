const db = require('../../data/dbConfig');

module.exports = {
  get,
  post,
};

function get() {
  return db('tasks');
}

function post(task) {
  return db('tasks')
    .insert(task)
    .then(([id]) => {
      return db('tasks').where('task_id', id).first();
    });
}
