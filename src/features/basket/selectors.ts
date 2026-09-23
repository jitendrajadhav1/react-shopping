import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { calculateBill } from "../../utils/pricing";
import { ProductId } from "../../data/products";

export const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBill = createSelector([selectBasketItems], (items) =>
  calculateBill(items),
);

export const selectIsInBasket = (state: RootState, id: ProductId) =>
  Boolean(state.basket.items[id]);
