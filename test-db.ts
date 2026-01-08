
import * as dotenv from 'dotenv';
dotenv.config();

import { neon } from '@neondatabase/serverless';

async function testConnection() {
  console.log('Testing connection...');
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is missing!');
    process.exit(1);
  }
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT 1 as result`;
    console.log('Connection successful:', result);
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testConnection();
