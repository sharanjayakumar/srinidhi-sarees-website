import { neon } from '@neondatabase/serverless';
import { env } from '../env';

let sqlClient: ReturnType<typeof neon> | null = null;

export function getNeonClient() {
  if (!sqlClient) {
    const databaseUrl = env.NETLIFY_DATABASE_URL;
    
    if (!databaseUrl) {
      console.warn('NETLIFY_DATABASE_URL not set. Neon database unavailable.');
      return null;
    }

    try {
      sqlClient = neon(databaseUrl);
      console.log('Neon database client initialized');
    } catch (e) {
      console.error('Failed to initialize Neon client:', e);
      return null;
    }
  }

  return sqlClient;
}

export async function testNeonConnection(): Promise<boolean> {
  const sql = getNeonClient();
  
  if (!sql) {
    return false;
  }

  try {
    await sql`SELECT 1`;
    console.log('Neon database connection successful');
    return true;
  } catch (e) {
    console.error('Neon connection test failed:', e);
    return false;
  }
}

// Example usage function - demonstrates how to query Neon database
export async function getPostById(postId: number) {
  const sql = getNeonClient();
  
  if (!sql) {
    throw new Error('Neon database not available');
  }

  // Example query from the Neon documentation
  const result = await sql`SELECT * FROM posts WHERE id = ${postId}`;
  return result[0];
}

// Additional helper for executing raw SQL queries
export async function executeQuery<T = any>(queryText: TemplateStringsArray, ...params: any[]): Promise<T[]> {
  const sql = getNeonClient();
  
  if (!sql) {
    throw new Error('Neon database not available');
  }

  const result = await sql(queryText, ...params);
  return result as T[];
}