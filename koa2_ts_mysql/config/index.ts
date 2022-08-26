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
    },
    // 输出源
    appenders: {
      cheese: {
        type: "file", filename: "logs/cheese.log"
      },
      access: {
        type: "file", filename: "logs/access.log"
      },
    },
  }
}