import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductId } from "../../data/products";
import { BasketItems } from "../../utils/offers";

interface BasketState {
  items: BasketItems;
}

const initialState: BasketState = {
  items: {},
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<ProductId>) {
      const id = action.payload;
      state.items[id] = (state.items[id] ?? 0) + 1;
    },
    removeItem(state, action: PayloadAction<ProductId>) {
      const id = action.payload;
      const current = state.items[id] ?? 0;
      if (current <= 1) {
        delete state.items[id];
      } else {
        state.items[id] = current - 1;
      }
    },
    clearBasket(state) {
      state.items = {};
    },
  },
});

export const { addItems, removeItem, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
