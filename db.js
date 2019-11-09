const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
  console.log('connected to the db');
});

const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      Users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        password VARCHAR(128) NOT NULL,
        phone_number VARCHAR(50),
        address VARCHAR(100) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        registered TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Users table has been created!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createPropertyTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      Property(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        status VARCHAR(50),
        price VARCHAR(128),
        duration VARCHAR(128),
        state VARCHAR(50),
        city VARCHAR(50),
        address VARCHAR(128),
        type VARCHAR(50),
        created_on TIMESTAMP,
        image_url VARCHAR(128),
        owner_email VARCHAR(128) REFERENCES Users(email)
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Property table has been created!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createFlagsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      Flags(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        property_id INTEGER REFERENCES Property(id),
        created_on TIMESTAMP,
        reason VARCHAR(50),
        description VARCHAR(200)
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Flags table has been created!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users CASCADE';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Users table has been dropped!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const dropPropertyTable = () => {
  const queryText = 'DROP TABLE IF EXISTS Property CASCADE';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Property table has been dropped!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropFlagsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS Flags CASCADE';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Flags table has been dropped!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


module.exports = {
  createUsersTable,
  dropUsersTable,
  createPropertyTable,
  dropPropertyTable,
  createFlagsTable,
  dropFlagsTable,
};

require('make-runnable');
