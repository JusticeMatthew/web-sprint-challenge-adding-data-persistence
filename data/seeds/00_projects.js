exports.seed = function (knex) {
  return knex('projects')
    .del()
    .then(function () {
      return knex('projects').insert([
        { project_name: 'coding databases' },
        {
          project_name: 'coding APIs',
          project_description: 'I love coding...',
        },
        { project_name: 'coding MORE databases...' },
      ]);
    });
};
