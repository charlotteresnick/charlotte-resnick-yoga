exports.up = (knex) => {
  return knex.schema.createTable("users", (t) => {
    t.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("firstName").notNullable();
    t.string("lastName").notNullable();
    t.string("email").unique().notNullable();
    t.string("passwordHash").notNullable();
    t.boolean("isAdmin").notNullable().defaultTo(false);
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
