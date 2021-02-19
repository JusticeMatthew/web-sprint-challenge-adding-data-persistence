exports.seed = function (knex) {
  return knex('resources')
    .del()
    .then(function () {
      return knex('resources').insert([
        { resource_name: 'sticks' },
        { resource_name: 'stones' },
        { resource_name: 'gold', resource_description: 'Dont ask...' },
      ]);
    });
};
