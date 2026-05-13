import dotenv from 'dotenv';

dotenv.config();

const required = ['DATABASE_URL'] as const;

function loadEnv(): void {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

loadEnv();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number.parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL as string,
  isProduction: process.env.NODE_ENV === 'production',
} as const;
