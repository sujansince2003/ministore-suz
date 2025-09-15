"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const HeaderCart = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative h-9 w-9">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default HeaderCart;
