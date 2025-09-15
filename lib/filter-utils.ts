import type { ProductType, FilterState } from "@/types/index.types";



export function filterProducts(products: ProductType[], filters: FilterState) {
    return products
        .filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(filters.search.toLowerCase());
            const matchesCategory =
                filters.categories.length === 0 ||
                filters.categories.includes(product.category);
            const matchesPrice =
                product.price >= filters.minPrice && product.price <= filters.maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        })
        .sort((a, b) => {
            if (filters.sortBy === "low-to-high") {
                return a.price - b.price;
            }
            if (filters.sortBy === "high-to-low") {
                return b.price - a.price;
            }
            return 0;
        });
}