const { Model } = require("objection");
const knex = require("../db/knex");
const ModelBase = require("./ModelBase");

Model.knex(knex);

class User extends ModelBase {
  static get tableName() {
    return "users";
  }

  static get virtualAttributes() {
    return ["fullName"];
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static get relationMappings() {
    const Message = require("./Message");
    const Class = require("./Class");

    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "users.id",
          to: "messages.user_id",
        },
      },
      classes: {
        relation: Model.ManyToManyRelation,
        modelClass: Class,
        join: {
          from: "classes.id",
          through: {
            from: "enrollments.classId",
            to: "enrollments.userId",
          },
          to: "users.id",
        },
      },
    };
  }
}

module.exports = User;
