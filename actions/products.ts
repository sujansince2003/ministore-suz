"use server"

import type { ProductType } from "@/types/index.types";

export async function getProducts(): Promise<ProductType[]> {
    const res = await fetch("https://fakestoreapi.com/products", {
        cache: "force-cache"
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    return data;
}


export async function getProduct(id: string): Promise<ProductType> {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch product with ID: ${id}`);
    }

    const data = await res.json();
    return data;
}

export async function getCategories(): Promise<string[]> {
    const res = await fetch("https://fakestoreapi.com/products/categories", {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }

    const data = await res.json();
    return data;
}

export async function getProductsByCategory(category: string): Promise<ProductType[]> {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch products for category: ${category}`);
    }

    const data = await res.json();
    return data;
}