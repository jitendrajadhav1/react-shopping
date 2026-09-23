import React from "react";
import { useAppDispatch } from "../store/hooks";
import { CartRow } from "../utils/pricing";
import { formatPrice } from "../utils/money";
import { addItems, removeItem } from "../features/basket/basketSlice";

interface Props {
  row: CartRow;
}

const qtyButton =
  "h-8 w-8 rounded-md border border-emerald-700 text-emerald-700 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";

const BasketItem = ({ row }: Props) => {
  const dispatch = useAppDispatch();
  const { product, quantity, price, savings, cost } = row;

  return (
    <>
      <li className="py-4">
        <div className="flex items-center gap-4">
          <span className="flex-1 font-medium">{product.name}</span>
          <span className="tabular-nums text-stone-600">
            {formatPrice(product.price)}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={qtyButton}
              onClick={() => dispatch(removeItem(product.id))}
              aria-label={`Remove one ${product.name}`}
            >
              −
            </button>
            <span
              className="w-6 text-center tabular-nums"
              data-testid={`qty-${product.id}`}
            >
              {quantity}
            </span>
            <button
              type="button"
              className={qtyButton}
              onClick={() => dispatch(addItems(product.id))}
              aria-label={`Add one more ${product.name}`}
            >
              +
            </button>
          </div>
        </div>

        <dl className="mt-2 space-y-1 text-right text-sm">
          <div className="text-stone-500">
            <dt className="inline">Item price </dt>
            <dd className="inline tabular-nums">
              {formatPrice(product.price)} × {quantity} = {formatPrice(price)}
            </dd>
          </div>

          {savings.map((s) => (
            <div key={s.id} className="text-red-600">
              <dt className="inline">{s.description}: </dt>
              <dd className="inline tabular-nums">−{formatPrice(s.saving)}</dd>
            </div>
          ))}

          <div className="font-medium">
            <dt className="inline">Item cost </dt>
            <dd className="inline tabular-nums">{formatPrice(cost)}</dd>
          </div>
        </dl>
      </li>
    </>
  );
};

export default BasketItem;
