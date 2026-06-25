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
    console.log('Pinging database to keep it alive...');
    await db.execute(sql`SELECT 1`);
    console.log('Successfully pinged the database.');
  } catch (error) {
    console.error('Failed to ping the database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
