import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: process.env.SUBSCRIBE_MYSQL_HOST,
    port: process.env.SUBSCRIBE_MYSQL_PORT,
    database: process.env.SUBSCRIBE_MYSQL_DATABASE,
    user: process.env.SUBSCRIBE_MYSQL_USER,
    password: process.env.SUBSCRIBE_MYSQL_PASSWORD
  }
});

export default db;