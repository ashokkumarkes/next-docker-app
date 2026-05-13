import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { env } from '../config/env';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        ...(env.isProduction ? {} : { stack: err.stack }),
      },
    });
    return;
  }

  const message =
    err instanceof Error ? err.message : 'Internal server error';

  console.error(err);

  res.status(500).json({
    error: {
      message: env.isProduction ? 'Internal server error' : message,
      ...(env.isProduction ? {} : { stack: err instanceof Error ? err.stack : undefined }),
    },
  });
}
