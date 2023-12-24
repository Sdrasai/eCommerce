-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);
