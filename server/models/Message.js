const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class Message extends Model {
  static get tableName() {
    return "messages";
  }

  static get relationMappings() {
    const User = require("./User");

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "messages.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Message;
