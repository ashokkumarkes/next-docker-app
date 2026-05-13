import type { Request, Response } from 'express';
import * as userService from '../services/user.service';

export async function getUsers(_req: Request, res: Response): Promise<void> {
  const users = await userService.listUsers();
  res.status(200).json({ data: users });
}

export async function postUser(req: Request, res: Response): Promise<void> {
  const { name, email } = req.body as { name?: string; email?: string };
  const user = await userService.createUser({
    name: name ?? '',
    email: email ?? '',
  });
  res.status(201).json({ data: user });
}
