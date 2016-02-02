require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/yogabuilder'
  },

  production: {
    client: 'pg',
    connection: process.env.PRODUCTION_DATABASE_URL + '?ssl=true'
  },
  staging: {
    client: 'pg',
    connection: process.env.STAGING_DATABASE_URL + '?ssl=true'
  }
};
