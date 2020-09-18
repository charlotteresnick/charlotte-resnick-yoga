const db = require("../db/config");

class User {
  constructor(user) {
    this.id = user.id || null;
    this.username = user.username;
    this.email = user.email;
    this.password_digest = user.password_digest;
  }

  static findByUsername(username) {
    return db
      .oneOrNone("SELECT * FROM users WHERE username = $1", username)
      .then((user) => {
        if (user) return new this(user);
      });
  }

  static findByUserEmail(email) {
    return db
      .oneOrNone("SELECT * FROM users WHERE email = $1", email)
      .then((user) => {
        if (user) return new this(user);
      });
  }

  static getById(id) {
    return db
      .oneOrNone(`SELECT * FROM users where id = $1`, id)
      .then((user) => {
        if (user) {
          return new this(user);
        } else {
          throw new Error("user not found");
        }
      });
  }

  save() {
    return db
      .one(
        `
          INSERT INTO users
          (username, email, password_digest)
          VALUES ($/username/, $/email/, $/password_digest/)
          RETURNING *
          `,
        this
      )
      .then((user) => Object.assign(this, user));
  }
}

module.exports = User;
