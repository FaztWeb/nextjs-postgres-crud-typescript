import express from 'express';
import { Pool } from 'pg';

function connect() {
  return new Promise((resolve, reject) => {
    const pool = new Pool({
      connectionString: 'postgres://postgres:postgres@postgres:5432/usersdb',
    });
    pool
      .connect()
      .then((pool) => {
        console.log('connected');
        resolve(pool);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

function establishConnection() {
  const a = connect();
  a.then(() => console.log('success')).catch((err) => {
    console.error('Retrying');
    // I suggest using some variable to avoid the infinite loop.
    setTimeout(establishConnection, 2000);
  });
}

establishConnection();

const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
