import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type TokenPayload = {
  userId: string;
  email: string;
  role: string;
  status: string;
};

export function createToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: '1h',
  });
}

export function verifyToken(token: string): TokenPayload & { iat: number; exp: number } {
  return jwt.verify(token, env.jwtSecret) as TokenPayload & { iat: number; exp: number };
}
