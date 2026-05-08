const mysql = require("mysql2");

let connection;

const dbSingleton = {
  getConnection: () => {
    if (!connection) {
      // Railway MySQL uses a single connection URL
      connection = mysql.createConnection(process.env.MYSQL_URL);

      connection.connect((err) => {
        if (err) {
          console.error("Error connecting to database:", err);
          return;
        }
        console.log("Connected to MySQL!");
      });

      connection.on("error", (err) => {
        console.error("Database connection error:", err);

        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          connection = null;
        }
      });
    }

    return connection;
  },
};

module.exports = dbSingleton;
