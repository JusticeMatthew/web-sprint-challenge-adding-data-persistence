exports.seed = function (knex) {
  return knex('tasks')
    .del()
    .then(function () {
      return knex('tasks').insert([
        {
          task_description: 'Take a break',
          project_id: 1,
        },
        {
          task_description: 'Code all the things',
          task_notes: 'Im a note',
          project_id: 1,
        },
        {
          task_description: '????',
          project_id: 1,
        },
        {
          task_description: 'Profit',
          project_id: 2,
        },
      ]);
    });
};
