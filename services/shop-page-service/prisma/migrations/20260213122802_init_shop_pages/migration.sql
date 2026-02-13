-- CreateEnum
CREATE TYPE "PageStatus" AS ENUM ('NEW_PAGE', 'DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "shop_pages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "status" "PageStatus" NOT NULL DEFAULT 'NEW_PAGE',
    "vendorId" TEXT NOT NULL,
    "htmlKey" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_page_products" (
    "id" TEXT NOT NULL,
    "shopPageId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shop_page_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shop_pages_slug_key" ON "shop_pages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "shop_page_products_shopPageId_productId_key" ON "shop_page_products"("shopPageId", "productId");

-- AddForeignKey
ALTER TABLE "shop_page_products" ADD CONSTRAINT "shop_page_products_shopPageId_fkey" FOREIGN KEY ("shopPageId") REFERENCES "shop_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
