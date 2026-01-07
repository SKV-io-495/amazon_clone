
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

let sql: any;
if (process.env.NODE_ENV === 'production') {
  sql = neon(process.env.DATABASE_URL!);
} else {
  if (!(global as any).sql) {
    (global as any).sql = neon(process.env.DATABASE_URL!);
  }
  sql = (global as any).sql;
}

export const db = drizzle(sql, { schema });
