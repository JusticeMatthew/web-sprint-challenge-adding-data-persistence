exports.up = function (knex) {
  return (
    knex.schema
      // Projects
      .createTable('projects', (t) => {
        t.increments('project_id');
        t.string('project_name').unique().notNullable();
        t.text('project_description');
        t.boolean('project_completed').notNullable().defaultTo(false);
      })
      // Resources
      .createTable('resources', (t) => {
        t.increments('resource_id');
        t.string('resource_name').unique().notNullable();
        t.text('resource_description');
      })
      // Tasks
      .createTable('tasks', (t) => {
        t.increments('task_id');
        t.text('task_description').notNullable();
        t.text('task_notes');
        t.boolean('task_completed').notNullable().defaultTo(false);
        t.integer('project_id')
          .unsigned()
          .notNullable()
          .references('project_id')
          .inTable('projects');
      })
      // Project resources
      .createTable('project_resources', (t) => {
        t.increments();
        t.integer('resource_id')
          .unsigned()
          .notNullable()
          .references('resource_id')
          .inTable('resources');
        t.integer('project_id')
          .unsigned()
          .notNullable()
          .references('project_id')
          .inTable('projects');
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
