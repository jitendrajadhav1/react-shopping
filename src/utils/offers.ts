import { getProduct, ProductId } from "../data/products";

export type BasketItems = Partial<Record<ProductId, number>>

export interface Offer {
  id: string
  description: string
  productId: ProductId // the item the discount shows against
  getSaving: (items: BasketItems) => number
}

const qty = (items: BasketItems, id: ProductId) => items[id] ?? 0

export const offers: Offer[] = [
  {
    id: 'cheese-bogof',
    description: 'Buy one Cheese, get one free',
    productId: 'cheese',
    getSaving: (items) => Math.floor(qty(items, 'cheese') / 2) * getProduct('cheese').price,
  },
  {
    id: 'soup-half-bread',
    description: 'Half price Bread with every Soup',
    productId: 'bread',
    getSaving: (items) => {
      const discountedLoaves = Math.min(qty(items, 'soup'), qty(items, 'bread'))
      return discountedLoaves * Math.round(getProduct('bread').price / 2)
    },
  },
  {
    id: 'butter-third-off',
    description: 'A third off Butter',
    productId: 'butter',
    getSaving: (items) => qty(items, 'butter') * Math.round(getProduct('butter').price / 3),
  },
]
