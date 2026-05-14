import type { Request, Response } from 'express';
import * as tokenService from '../services/token.service';
import * as userService from '../services/user.service';
import { AppError } from '../errors/AppError';

export async function createToken(req: Request, res: Response): Promise<void> {
  const { email } = req.body as { email?: string };

  if (!email) {
    throw new AppError(400, 'Email is required to generate a token');
  }

  const user = await userService.findUserByEmail(email.trim().toLowerCase());
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const accessToken = tokenService.createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
  });

  res.status(200).json({ data: { accessToken } });
}
