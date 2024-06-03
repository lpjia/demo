module.exports = appInfo => {
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'test',
    username: 'try',
    password: 'try',
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }

  return {
    ...config,
  };
}