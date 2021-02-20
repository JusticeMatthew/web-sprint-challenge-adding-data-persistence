const db = require('../../data/dbConfig');

module.exports = {
  get,
  post,
};

function get() {
  return db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description',
    );
}

function post(task) {
  return db('tasks')
    .insert(task)
    .then(([id]) => {
      return db('tasks').where('task_id', id).first();
    });
}
