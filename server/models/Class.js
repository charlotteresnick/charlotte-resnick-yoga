const { Model } = require("objection");
const knex = require("../db/knex");
const ModelBase = require("./ModelBase");

Model.knex(knex);

class Class extends ModelBase {
  static get tableName() {
    return "classes";
  }

  static get relationMappings() {
    const User = require("./User");
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "users.id",
          through: {
            from: "enrollments.userId",
            to: "enrollments.classId",
          },
          to: "classes.id",
        },
      },
    };
  }
}

module.exports = Class;
