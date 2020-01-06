// const fs = require('fs');

module.exports = {
  "development": {
    "use_env_variable": "postgres://postgres@postgres:5432/postgres",
    "username": "postgres",
    "password": null,
    "database": "postgres",
    "host": "0.0.0.0",
    "port": 5432,
    "logging": console.log,
    "dialect": "postgres",
    "operatorsAliases": "Sequelize.Op"
  },
  "test": {
    "use_env_variable": "postgres://postgres@postgres:5432/postgres",
    "username": "postgres",
    "password": null,
    "database": "postgres",
    "host": "0.0.0.0",
    "port": 5432,
    "logging": false,
    "dialect": "postgres",
    "operatorsAliases": "Sequelize.Op"
  },
  "production": {
    "use_env_variable": "postgres://postgres@postgres:5432/postgres",
    "username": "postgres",
    "password": null,
    "database": "postgres",
    "host": "0.0.0.0",
    "port": 5432,
    "logging": false,
    "dialect": "postgres",
    "operatorsAliases": "Sequelize.Op"
  }
};
