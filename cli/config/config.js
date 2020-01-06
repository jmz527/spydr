// const fs = require('fs');

module.exports = {
  "development": {
    "username": "jmz527",
    "password": null,
    "database": "spydr_dev",
    "host": "127.0.0.1",
    "port": 5432,
    "logging": console.log,
    "dialect": "postgres",
    "operatorsAliases": "Sequelize.Op"
  },
  "test": {
    "username": "jmz527",
    "password": null,
    "database": "spydr_test",
    "host": "127.0.0.1",
    "port": 5432,
    "logging": console.log,
    "dialect": "postgres",
    "operatorsAliases": "Sequelize.Op"
  },
  "production": {
    "username": "jmz527",
    "password": null,
    "database": "spydr",
    "host": "127.0.0.1",
    "port": 5432,
    "logging": false,
    "dialect": "postgres",
    "operatorsAliases": "Sequelize.Op"
  }
};
