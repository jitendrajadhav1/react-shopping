import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectBill } from "../features/basket/selectors";
import { formatPrice } from "../utils/money";
import { saveOrder } from "../features/orders/ordersSlice";

const BillSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { subTotal, totalSavings, total, rows } = useAppSelector(selectBill);
  const { status, error } = useAppSelector((state) => state.orders);

  return (
    <div className="border-t-2 border-stone-200 pt-4">
      <dl className="space-y-2">
        <div className="flex justify-between">
          <dt>Sub total</dt>
          <dd className="tabular-nums" data-testid="subtotal">
            {formatPrice(subTotal)}
          </dd>
        </div>
        <div className="flex justify-between text-red-600">
          <dt>Savings</dt>
          <dd className="tabular-nums" data-testid="savings">
            {formatPrice(totalSavings)}
          </dd>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <dt>Total</dt>
          <dd className="tabular-nums" data-testid="total">
            {formatPrice(total)}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <button
          type="button"
          onClick={() => dispatch(saveOrder())}
          disabled={rows.length === 0 || status === "saving"}
          className="w-full rounded-md bg-emerald-700 py-2.5 font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          {status === "saving" ? "Saving order…" : "Save order"}
        </button>
        {status === "saved" && (
          <p className="mt-2 text-sm text-emerald-700">Order saved.</p>
        )}
        {status === "failed" && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default BillSummary;
