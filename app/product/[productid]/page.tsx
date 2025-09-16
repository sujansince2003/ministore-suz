import { getProduct, getProductsByCategory } from "@/actions/products";
import { ProductDetail } from "@/components/general/ProductDetail";
import { ProductType } from "@/types/index.types";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productid: string }>;
}): Promise<Metadata> {
  try {
    const { productid } = await params;
    const product = await getProduct(productid);

    return {
      title: `${product.title} - Mini Store`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      title: "Product Not Found - Mini Store",
    };
  }
}

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
