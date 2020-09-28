const { Model } = require("objection");
const knex = require("../db/knex");
const ModelBase = require("./ModelBase");

Model.knex(knex);

class Message extends ModelBase {
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
          from: "messages.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Message;
