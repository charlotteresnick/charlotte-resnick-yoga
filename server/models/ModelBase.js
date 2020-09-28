const { Model } = require("objection");

class ModelBase extends Model {
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = ModelBase;
