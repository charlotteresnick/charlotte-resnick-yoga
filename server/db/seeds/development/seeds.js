exports.seed = (knex) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        {
          first_name: "Charlotte",
          last_name: "Resnick",
          email: "charlotte.resnick@gmail.com",
          password_hash: "poop",
          is_admin: true,
          created_at: "2020-08-21T21:41:52.625Z",
          updated_at: "2020-09-21T21:42:01.496Z",
        },
      ]);
    });
};
