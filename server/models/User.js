const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get virtualAttributes() {
    return ["fullName"];
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = User;
