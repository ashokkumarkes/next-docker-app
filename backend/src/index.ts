import './config/env';
import { createServer } from 'http';
import { createApp } from './app';
import { env } from './config/env';
import { prisma } from './prisma/client';

async function bootstrap(): Promise<void> {
  const app = createApp();
  const server = createServer(app);

  server.listen(env.port, '0.0.0.0', () => {
    console.log(`Server listening on port ${env.port} (${env.nodeEnv})`);
  });

  void prisma
    .$connect()
    .then(() => {
      console.log('Database connection established');
    })
    .catch((err: unknown) => {
      console.error('Database connection failed during startup:', err);
    });

  const shutdown = async (signal: string): Promise<void> => {
    console.log(`${signal} received, shutting down gracefully`);
    server.close(() => {
      void prisma
        .$disconnect()
        .catch((err: unknown) => {
          console.error('Failed to disconnect Prisma cleanly:', err);
        })
        .finally(() => process.exit(0));
    });
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));


}



bootstrap().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
