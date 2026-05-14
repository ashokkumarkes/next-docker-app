-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'User',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Active';
