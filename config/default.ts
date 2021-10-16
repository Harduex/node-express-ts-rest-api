export default {
  server: {
    port: 3000,
    host: "localhost",
  },
  db: {
    database: process.env.DB_DATABASE_NAME || "node_rest_api",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};
