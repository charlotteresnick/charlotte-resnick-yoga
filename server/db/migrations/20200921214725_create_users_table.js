exports.up = (knex) => {
  return knex.schema.createTable("users", (t) => {
    t.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("first_name").notNullable();
    t.string("last_name").notNullable();
    t.string("email").notNullable();
    t.string("password_hash").notNullable();
    t.boolean("is_admin").notNullable().defaultTo(false);
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
