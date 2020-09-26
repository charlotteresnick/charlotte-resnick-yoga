
exports.up = function(knex) {
  knex.schema.createTable('enrollments', function(table) {
      table.uuid('id').primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid('userId').references('users.id');
      table.uuid('classId').references('classes.id');
      table.boolean("isCancelled").defaultTo(false);
    }),
};

exports.down = function(knex) {
  return knex.schema.dropTable("enrollments");
};
