import React from "react";
import ProductCard from "./ProductCard";
import type { ProductType } from "@/types/index.types";
import { getProducts } from "@/actions/products";
import { CircleSlash2 } from "lucide-react";
const ShowProducts = async () => {
  const products = await getProducts();

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShowProducts;
