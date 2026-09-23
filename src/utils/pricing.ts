import { products, type Product } from "../data/products";
import {
  offers as defaultOffers,
  type BasketItems,
  type Offer,
} from "./offers";

export interface AppliedOffer {
  id: string;
  description: string;
  saving: number;
}

export interface BillLine {
  product: Product;
  quantity: number;
  price: number;
  savings: AppliedOffer[];
  cost: number;
}

export interface Bill {
  lines: BillLine[];
  subTotal: number;
  totalSavings: number;
  total: number;
}

export function calculateBill(
  items: BasketItems,
  offers: Offer[] = defaultOffers,
): Bill {
  const lines: BillLine[] = [];
  for (const product of products) {
    const quantity = items[product.id] ?? 0;
    if (quantity <= 0) continue;

    const price = product.price * quantity;
    const savings = offers
      .filter((offer) => offer.productId === product.id)
      .map((offer) => ({
        id: offer.id,
        description: offer.description,
        saving: offer.getSaving(items),
      }))
      .filter((applied) => applied.saving > 0);

    const saved = savings.reduce((sum, s) => sum + s.saving, 0);

    lines.push({ product, quantity, price, savings, cost: price - saved });
  }

  const subTotal = lines.reduce((sum, line) => sum + line.price, 0);
  const total = lines.reduce((sum, line) => sum + line.cost, 0);

  return { lines, subTotal, totalSavings: subTotal - total, total };
}
