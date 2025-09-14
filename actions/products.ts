"use server"

import type { ProductType } from "@/types/index.types";

export async function getProducts(): Promise<ProductType[]> {

    const res = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}


export async function getProduct(id: string): Promise<ProductType> {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}

export async function getCategories(): Promise<string[]> {
    const res = await fetch("https://fakestoreapi.com/products/categories", {
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}

export async function getProductsByCategory(category: string): Promise<ProductType[]> {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`, {
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}