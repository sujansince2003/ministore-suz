"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import type { ProductType } from "@/types/index.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { truncateText, formatCurrency } from "@/lib/products-utils";

interface ProductDetailProps {
  product: ProductType;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const isOutOfStock = product.rating.count === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    toast.success(`${truncateText(product.title, 30)} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>

            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
            />
            {isOutOfStock && (
              <div className="absolute top-4 left-4">
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3 capitalize">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating.rate.toFixed(1)} ({product.rating.count}{" "}
                  reviews)
                </span>
              </div>
            </div>

            <p className="text-4xl font-bold text-primary mb-6">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span
                className={isOutOfStock ? "text-destructive" : "text-green-600"}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : `In Stock (${product.rating.count} available)`}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full sm:w-auto"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
