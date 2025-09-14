"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { ProductType } from "@/types/index.types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const isOutOfStock = product.rating.count === 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    // add to cart
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full flex flex-col">
        <CardContent className="p-3 flex-grow">
          <div className="relative aspect-square mb-4 bg-gray-100 w-full overflow-hidden dark:bg-gray-800 rounded-2xl">
            <Image
              src={product.image}
              alt="product image"
              className="object-contain py-4"
              fill
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium text-sm bg-red-600 px-2 py-1 rounded">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="font-medium text-sm leading-tight line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-primary">
                ${product.price}
              </span>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span>⭐️ {product.rating.rate.toFixed(1)}</span>
                <span>({product.rating.count})</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 mt-auto">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full cursor-pointer "
            size={"lg"}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
