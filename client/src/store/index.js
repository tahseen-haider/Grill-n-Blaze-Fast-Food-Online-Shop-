import cartItemsSlice from "./cartItemsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cartItems: cartItemsSlice,
  },
});
