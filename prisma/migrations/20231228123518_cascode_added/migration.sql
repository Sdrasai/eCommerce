-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_catId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;
