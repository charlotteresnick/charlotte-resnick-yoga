exports.seed = (knex) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        {
          firstName: "Charlotte",
          lastName: "Resnick",
          email: "charlotte.resnick@gmail.com",
          passwordHash: "poop",
          isAdmin: true,
        },
      ]);
    });
};
