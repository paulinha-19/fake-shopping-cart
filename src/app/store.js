import { configureStore } from "@reduxjs/toolkit";
import { shopApiSlice } from "../services/features/api/shopApiSlice";
import cartReducer from "../services/features/cart/cartSlice";
import searchReducer from "../services/features/search/searchSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    [shopApiSlice.reducerPath]: shopApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApiSlice.middleware)
});
