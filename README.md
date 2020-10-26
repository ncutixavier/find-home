# find-home

[![Build Status](https://travis-ci.org/ncutixavier/find-home.svg?branch=develop)](https://travis-ci.org/ncutixavier/find-home)
[![Maintainability](https://api.codeclimate.com/v1/badges/1ce0fb7417e1fd26870f/maintainability)](https://codeclimate.com/github/ncutixavier/find-home/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/ncutixavier/find-home/badge.svg?branch=develop)](https://coveralls.io/github/ncutixavier/find-home?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1ce0fb7417e1fd26870f/test_coverage)](https://codeclimate.com/github/ncutixavier/find-home/test_coverage)

---
## Project setup
---
### Start Up
* Clone the repository
* Install packages by running `npm install`

### Dotenv setup
  * Create ``` .env ``` in project root directory
  * Take a look at the ``` .env.example ```  file which is in the project root directory to have a clue on environment variables that are being used in this project
  * Copy all keys from the ``` .env.example ```  file to ``` .env ``` file and add values to corresponding keys. These can be obtained from the project administrator

### Sequelize ORM Setup

1. **Configuring** `.env`
     - Download and install [pgAdmin](https://www.postgresql.org/download/)
     - Create two databases, one for testing and another for development.
     - Copy  `DATABASE_DEV_URL=postgres://your_db_user:your_password@127.0.0.1:5432/your_dev_db_name` and `DATABASE_TEST_URL=postgres://your_db_user:your_password@127.0.0.1:5432/your_test_db_name` URLs from ```.env.example``` to ```.env```
     - Edit them with your real database user, password and database name.

2. **Running Migrations**
     - Run ``` npm run migrateDB ``` in terminal to fire up migration

3. **To Undo Migrations**
     - Run ``` npm run migrate:reset``` to undo all migrations

4. **Running Seeds**
     - Run `npm run seeding` to seed all

### Running server
- Run `npm run dev` to run server local

### Running tests
- Run `npm test` to run tests

### Api Documentation
[Swagger Documentation](http://find-home-apps-staging.herokuapp.com/api-docs/)
