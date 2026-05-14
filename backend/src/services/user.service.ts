import { prisma } from '../prisma/client';
import { AppError } from '../errors/AppError';

export interface CreateUserInput {
  name: string;
  email: string;
  role?: string;
  status?: string;
}

export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(input: CreateUserInput) {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  const role = input.role?.trim() || 'User';
  const status = input.status?.trim() || 'Active';

  if (!name || !email) {
    throw new AppError(400, 'Name and email are required');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, 'A user with this email already exists');
  }

  return prisma.user.create({
    data: { name, email, role, status },
  });
}
