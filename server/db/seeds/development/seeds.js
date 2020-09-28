const faker = require("faker");
const bcrypt = require("bcryptjs");

const genPassword = async () => {
  const salt = await bcrypt.genSaltSync();
  return await bcrypt.hashSync("password", salt);
};

exports.seed = async (knex) => {
  await knex("messages").del();
  await knex("users").del();

  await knex("users").insert([
    {
      firstName: "Charlotte",
      lastName: "Resnick",
      email: "charlotte.resnick@gmail.com",
      passwordHash: await genPassword(),
      isAdmin: true,
    },
  ]);

  const users = [];
  const passwordHash = await genPassword();
  for (let i = 0; i < 100; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      passwordHash,
      isAdmin: false,
    });
  }

  await knex("users").insert(users);

  const userIds = await knex("users").pluck("id");
  const messages = userIds.map((id) => {
    return {
      userId: id,
      message: faker.lorem.paragraphs(1),
    };
  });

  await knex("messages").insert(messages);
};
