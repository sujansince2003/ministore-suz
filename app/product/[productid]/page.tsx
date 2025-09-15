import { getProduct, getProductsByCategory } from "@/actions/products";
import { ProductDetail } from "@/components/ui/general/ProductDetail";
import { ProductType } from "@/types/index.types";
import React from "react";

const page = async ({ params }: { params: Promise<{ productid: string }> }) => {
  const { productid } = await params;

  const product = await getProduct(productid);
  let relatedProducts: ProductType[] = [];
  if (product) {
    relatedProducts = await getProductsByCategory(product.category);
  }

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
};

export default page;
