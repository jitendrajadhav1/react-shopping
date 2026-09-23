import { combineReducers, configureStore } from "@reduxjs/toolkit";

import basketReducer from "../features/basket/basketSlice";
import ordersReducer from "../features/orders/ordersSlice";

const rootReducer = combineReducers({
  basket: basketReducer,
  orders: ordersReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
