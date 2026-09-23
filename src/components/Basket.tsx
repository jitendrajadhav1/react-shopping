import React from "react";
import { useAppSelector } from "../store/hooks";
import { selectBill } from "../features/basket/selectors";
import BasketItem from "./BasketItems";
import BillSummary from "./BillSummary";

const Basket: React.FC = () => {
  const { rows } = useAppSelector(selectBill);

  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="border-b border-stone-200 pb-3 text-xl font-semibold">
        Basket
      </h2>

      {rows.length === 0 ? (
        <p className="py-8 text-center text-stone-500">
          Your basket is empty. Add a product to get started.
        </p>
      ) : (
        <ul className="divide-y divide-stone-100">
          {rows.map((row) => (
            <BasketItem key={row.product.id} row={row} />
          ))}
        </ul>
      )}

      <BillSummary />
    </div>
  );
};

export default Basket;
