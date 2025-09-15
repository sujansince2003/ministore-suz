"use client";

import { useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import type { ProductType } from "@/types/index.types";
import { filterProducts } from "@/lib/filter-utils";
import type { FilterState } from "@/types/index.types";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsWrapperProps {
  initialProducts: ProductType[];
  categories: string[];
}

export function ProductsWrapper({
  initialProducts,
  categories,
}: ProductsWrapperProps) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = useCallback(
    async (filters: FilterState) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const filtered = filterProducts(initialProducts, filters);
        setFilteredProducts(filtered);
        setCurrentPage(1);
      } finally {
        setIsLoading(false);
      }
    },
    [initialProducts]
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-8">
        <aside className="col-span-1">
          <ProductFilters
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className="col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {!isLoading && (
                <>
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 per page</SelectItem>
                  <SelectItem value="9">9 per page</SelectItem>
                  <SelectItem value="12">12 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : currentProducts.map((product: ProductType) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          {!isLoading && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
