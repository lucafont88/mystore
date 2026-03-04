-- CreateTable
CREATE TABLE "user_ip_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_ip_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_ip_logs_userId_createdAt_idx" ON "user_ip_logs"("userId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "user_ip_logs" ADD CONSTRAINT "user_ip_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
