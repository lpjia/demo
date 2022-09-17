export default {
  server: {
    port: process.env.SERVER_PORT
  },
  db: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pawd: process.env.DB_PAWD
  },
  log: {
    // 范畴
    categories: {
      default: {
        appenders: ["cheese"], level: "warn"
      },
      access: {
        appenders: ["access"], level: "info"
      },
      db: {
        appenders: ["db"], level: "info"
      },
    },
    // 输出源
    appenders: {
      cheese: {
        type: "file", filename: "z_log/cheese.log"
      },
      access: {
        type: "file", filename: "z_log/access.log"
      },
      db: {
        type: "file", filename: "z_log/db.log"
      },
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
  }
}