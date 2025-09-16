"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";

import type { cartItemType } from "@/types/index.types";
import { formatCurrency, truncateText } from "@/lib/products-utils";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: cartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  const totalPrice = useMemo(
    () => formatCurrency(product.price * quantity),
    [product.price, quantity]
  );

  const truncatedTitle = useMemo(
    () => truncateText(product.title, 60),
    [product.title]
  );

  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      if (newQuantity <= 0) {
        removeItem(product.id);
      } else {
        updateQuantity(product.id, newQuantity);
      }
    },
    [product.id, removeItem, updateQuantity]
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 py-6 border-b">
      <div className="relative h-20 w-20 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.title}
          fill
          loading="lazy"
          className="object-contain p-1"
          sizes="(max-width: 640px) 80px, 64px"
          priority={false}
          quality={75}
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiIR0hIiEhIR0eISMqLjIrIS8vNDk4Lzc3QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR"
          placeholder="blur"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1 sm:space-y-0">
        <h3 className="text-sm font-medium">{truncatedTitle}</h3>
        <p className="text-xs text-muted-foreground capitalize">
          {product.category}
        </p>
        <p className="text-sm font-medium sm:mt-1">
          {formatCurrency(product.price)}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-normal sm:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" aria-hidden="true" />
          </Button>
          <span
            className="w-8 text-center text-sm font-medium"
            aria-label={`Quantity: ${quantity}`}
          >
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.rating.count}
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex flex-col items-end sm:items-start">
          <p className="text-sm font-medium">{totalPrice}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(product.id)}
            className="text-destructive hover:text-destructive mt-1 p-0 h-auto"
            aria-label={`Remove ${truncatedTitle} from cart`}
          >
            <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
            <span className="hidden sm:inline">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CartItem);
