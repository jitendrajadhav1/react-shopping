export type ProductId = 'bread' | 'milk' | 'cheese' | 'soup' | 'butter'

export interface Product {
id: ProductId
  name: string
  price: number // in pence
}

export const products: Product[] = [
    {id:'bread', name: 'Bread', price:110},
    {id:'milk', name: 'Milk', price:50},
    {id:'cheese', name: 'Cheese', price:90},
    {id:'soup', name: 'Soup', price:60},
    {id:'butter', name: 'Butter', price:120},
]

export const getProduct = (id:ProductId): Product =>{
    const product = products.find((p) => p.id=== id)
    if (!product) throw new Error(`Unknown product: ${id}`)
    return product
}