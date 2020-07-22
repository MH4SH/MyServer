import knex from 'knex';
const config = require('../../knexfile');

const connection = knex(config.dev);

export default connection;