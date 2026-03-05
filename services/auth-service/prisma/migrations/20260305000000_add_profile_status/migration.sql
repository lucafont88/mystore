-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('COMPLETE', 'PENDING_PROFILE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN "profileStatus" "ProfileStatus" NOT NULL DEFAULT 'COMPLETE';
