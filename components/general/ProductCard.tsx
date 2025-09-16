"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { ProductType } from "@/types/index.types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

import { truncateText } from "@/lib/products-utils";
import toast from "react-hot-toast";
import React from "react";

const ProductCard = React.memo(({ product }: { product: ProductType }) => {
  const isOutOfStock = product.rating.count === 0;
  const { addItem } = useCartStore();

  const handleAddToCart = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isOutOfStock) return;

      addItem(product);
      toast.success(`${truncateText(product.title, 30)} added to cart!`);
    },
    [addItem, isOutOfStock, product]
  );

  return (
    <Link href={`/product/${product.id}`} prefetch={false}>
      <Card className="h-full flex flex-col">
        <CardContent className="p-3 flex-grow">
          <div className="relative aspect-square mb-4 bg-gray-100 w-full overflow-hidden dark:bg-gray-800 rounded-2xl">
            <Image
              src={product.image}
              alt={product.title}
              className="object-contain py-4"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={75}
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiIR0hIiEhIR0eISMqLjIrIS8vNDk4Lzc3QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR"
              placeholder="blur"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span
                  className="text-white font-medium text-sm bg-red-600 px-2 py-1 rounded"
                  aria-label="Product out of stock"
                >
                  Out of Stock
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category}
            </p>
            <h2 className="font-medium text-sm leading-tight line-clamp-2">
              {product.title}
            </h2>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-primary">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span
                  aria-label={`Rating: ${product.rating.rate.toFixed(
                    1
                  )} out of 5`}
                >
                  ⭐️ {product.rating.rate.toFixed(1)}
                </span>
                <span aria-label={`${product.rating.count} reviews`}>
                  ({product.rating.count})
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 mt-auto">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full cursor-pointer"
            size="lg"
            aria-label={isOutOfStock ? "Product out of stock" : "Add to cart"}
          >
            <ShoppingCart className="w-4 h-4 mr-2" aria-hidden="true" />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
