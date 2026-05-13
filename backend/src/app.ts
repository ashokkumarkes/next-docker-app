import express from 'express';
import cors from 'cors';
import { apiRoutes } from './routes';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.send('Hello from Kubernetes');
  });

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/', apiRoutes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
