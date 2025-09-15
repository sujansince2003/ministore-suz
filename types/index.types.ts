export type ProductType = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    },


}



export type cartItemType = {
    product: ProductType,
    quantity: number
}

export type cartStore = {
    items: cartItemType[],
    addItem: (product: ProductType, quantity?: number) => void,
    removeItem: (productId: number) => void,
    updateQuantity: (productId: number, quantity: number) => void,
    clearCart: () => void,
    getTotalItems: () => number,
    getTotalPrice: () => number,
}


export type FilterState = {
    search: string;
    categories: string[];
    minPrice: number;
    maxPrice: number;
    sortBy: string;
}