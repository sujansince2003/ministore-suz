"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

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

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 py-6 border-b">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-1"
          sizes="64px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium">
          {truncateText(product.title, 60)}
        </h3>
        <p className="text-xs text-muted-foreground capitalize mt-1">
          {product.category}
        </p>
        <p className="text-sm font-medium mt-1">
          {formatCurrency(product.price)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= product.rating.count}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium">
          {formatCurrency(product.price * quantity)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(product.id)}
          className="text-destructive hover:text-destructive mt-1 p-0 h-auto"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
}
export default CartItem;
