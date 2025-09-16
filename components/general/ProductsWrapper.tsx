"use client";

import { useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import type { ProductType } from "@/types/index.types";
import { filterProducts } from "@/lib/filter-utils";
import type { FilterState } from "@/types/index.types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";

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
        await new Promise((resolve) => setTimeout(resolve, 500));
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
      {/* mobile filters */}
      <div className="lg:hidden ">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              aria-label="Open filters menu"
            >
              <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] px-4 sm:w-[350px]">
            <div className="pt-6">
              <ProductFilters
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* desktop filters */}
        <aside className="hidden lg:block">
          <ProductFilters
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className="lg:col-span-3 space-y-6">
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
                <SelectTrigger
                  className="w-[130px]"
                  aria-label="Products per page"
                >
                  <SelectValue placeholder="Products per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6" aria-label="Show 6 products per page">
                    6 per page
                  </SelectItem>
                  <SelectItem value="9" aria-label="Show 9 products per page">
                    9 per page
                  </SelectItem>
                  <SelectItem value="12" aria-label="Show 12 products per page">
                    12 per page
                  </SelectItem>
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
                aria-label={`Go to previous page${
                  currentPage === 1 ? " (disabled)" : ""
                }`}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm text-muted-foreground"
                  aria-live="polite"
                >
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                aria-label={`Go to next page${
                  currentPage === totalPages ? " (disabled)" : ""
                }`}
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
