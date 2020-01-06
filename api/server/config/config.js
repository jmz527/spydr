// const fs = require('fs');

module.exports = {
  "development": {
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
