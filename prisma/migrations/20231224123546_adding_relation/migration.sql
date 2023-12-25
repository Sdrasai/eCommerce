-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
