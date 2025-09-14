import { getProducts } from "@/actions/products";

import ProductCard from "@/components/ui/general/ProductCard";
import type { ProductType } from "@/types/index.types";
import { CircleSlash2 } from "lucide-react";
export default async function Home() {
  const products = await getProducts();
  console.log(products);
  if (products.length === 0) {
    return (
      <div className="text-center py-40">
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-4">
            <CircleSlash2 size={96} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            No products found
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 justify-center ">
      <h1>Products page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
