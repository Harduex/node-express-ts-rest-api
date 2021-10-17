export default {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },
  db: {
    database: process.env.DB_DATABASE_NAME || "node_rest_api",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};
