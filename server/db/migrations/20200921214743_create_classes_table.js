exports.up = (knex) => {
  return knex.schema.createTable("classes", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("name").notNullable();
    t.string("description").notNullable();
    t.datetime("timeStart").notNullable();
    t.datetime("timeEnd").notNullable();
    t.string("price").notNullable();
    t.string("location").notNullable();
    t.string("maxStudents").notNullable();
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("classes");
};
