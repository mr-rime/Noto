import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is missing');
  }

  console.log('Connecting to database...');
  const client = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    console.log('Ensuring keep_alive_logs table exists...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS keep_alive_logs (
        id SERIAL PRIMARY KEY,
        ping_value BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    const randomNumber = Math.floor(Math.random() * 1000000);
    console.log(`Inserting number ${randomNumber} into keep_alive_logs...`);
    
    await db.execute(sql`
      INSERT INTO keep_alive_logs (ping_value) VALUES (${randomNumber})
    `);

    console.log('Cleaning up old logs (keeping only the last 10)...');
    await db.execute(sql`
      DELETE FROM keep_alive_logs 
      WHERE id NOT IN (
        SELECT id FROM keep_alive_logs ORDER BY id DESC LIMIT 10
      )
    `);

    console.log('Successfully wrote to the database to keep it alive.');
  } catch (error) {
    console.error('Failed to write to the database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
