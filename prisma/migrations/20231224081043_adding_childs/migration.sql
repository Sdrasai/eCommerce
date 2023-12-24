/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `catId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - The required column `categoryId` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_catId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_productId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "catId",
DROP COLUMN "productId",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ALTER COLUMN "parentId" DROP NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId");

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductCategory";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;
