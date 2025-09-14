import { getProducts } from "@/actions/products";
import ProductCard from "@/components/ui/general/ProductCard";
import type { ProductType } from "@/types/index.types";

export default async function Home() {
  const products = await getProducts();

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
