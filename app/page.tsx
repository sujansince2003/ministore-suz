import { CircleSlash2 } from "lucide-react";
import { getProducts, getCategories } from "@/actions/products";
import { ProductsWrapper } from "@/components/ui/general";

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

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
    <div className="container mx-auto px-4 py-8">
      <ProductsWrapper initialProducts={products} categories={categories} />
    </div>
  );
}
