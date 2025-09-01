import cartItemsSlice from "./cartItemsSlice";
import userSlice from "./userSlice"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cartItems: cartItemsSlice,
    user: userSlice
  },
});
