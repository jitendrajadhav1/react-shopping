import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectBasketItems } from "../features/basket/selectors";
import { products } from "../data/products";
import { formatPrice } from "../utils/money";
import { addItems } from "../features/basket/basketSlice";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBasketItems);

  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="border-b border-stone-200 pb-3 text-xl font-semibold">
        Products
      </h2>
      <ul className="divide-y divide-stone-100">
        {products.map((product) => {
          const inBasket = Boolean(items[product.id]);

          return (
            <li key={product.id} className="flex items-center gap-4 py-3">
              <span className="flex-1">{product.name}</span>
              <span className="tabular-nums text-stone-600">
                {formatPrice(product.price)}
              </span>
              <button
                type="button"
                onClick={() => dispatch(addItems(product.id))}
                disabled={inBasket}
                aria-label={`Add ${product.name}`}
                className="w-20 rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-medium text-white disabled:bg-stone-300"
              >
                {inBasket ? "Added" : "Add"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
