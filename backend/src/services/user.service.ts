import { prisma } from '../prisma/client';
import { AppError } from '../errors/AppError';

export interface CreateUserInput {
  name: string;
  email: string;
}

export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createUser(input: CreateUserInput) {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  if (!name || !email) {
    throw new AppError(400, 'Name and email are required');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, 'A user with this email already exists');
  }

  return prisma.user.create({
    data: { name, email },
  });
}
