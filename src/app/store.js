import { configureStore } from "@reduxjs/toolkit";
import { shopApiSlice } from "../features/api/shopApiSlice";
import cartReducer from "../features/cart/cartSlice"

export default configureStore({
  reducer: {
    cart: cartReducer,
    [shopApiSlice.reducerPath]: shopApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApiSlice.middleware)
});
