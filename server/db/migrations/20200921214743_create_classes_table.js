exports.up = (knex) => {
  return knex.schema.createTable("classes", (t) => {
    t.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("name").notNullable();
    t.string("description").notNullable();
    t.datetime("time_start").notNullable();
    t.datetime("time_end").notNullable();
    t.integer("price").notNullable();
    t.string("location").notNullable();
    t.integer("max_students").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("classes");
};
