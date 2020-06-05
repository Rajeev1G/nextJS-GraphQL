
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function setup () {
    const db = await sqlite.open({
      filename: '/tmp/database.db',
      driver: sqlite3.Database
    });
    await db.migrate()
   db.close()
  }

  setup()