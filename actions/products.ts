"use server"


export async function getProducts() {

    const res = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store"
    });
    const data = await res.json();




    return data;
}