const db = require("../config/database");

exports.getAdmin = async (username) => {

  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM admins WHERE username = ?`;

    db.get(query, [username], (err, row) => {

      if (err) {
        reject(err);
      } else {
        resolve(row);
      }

    });

  });

};