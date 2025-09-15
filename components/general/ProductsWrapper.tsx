"use client";

import { useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import type { ProductType } from "@/types/index.types";
import { filterProducts } from "@/lib/filter-utils";
import type { FilterState } from "@/types/index.types";

interface ProductsWrapperProps {
  initialProducts: ProductType[];
  categories: string[];
}

export function ProductsWrapper({
  initialProducts,
  categories,
}: ProductsWrapperProps) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleFilterChange = useCallback(
    (filters: FilterState) => {
      const filtered = filterProducts(initialProducts, filters);
      setFilteredProducts(filtered);
    },
    [initialProducts]
  );

  return (
    <div className="grid grid-cols-4 gap-8">
      <aside className="col-span-1">
        <ProductFilters
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </aside>

      <main className="col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
