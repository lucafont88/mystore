-- Add IdentityStatus enum and new columns to vendor_profiles
CREATE TYPE "IdentityStatus" AS ENUM ('PENDING', 'PROCESSING', 'VERIFIED', 'FAILED');

ALTER TABLE "vendor_profiles"
  ADD COLUMN "identityStatus" "IdentityStatus" NOT NULL DEFAULT 'PENDING',
  ADD COLUMN "stripeVerificationSessionId" TEXT;
