import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch cart items from backend
export const fetchCartItems = createAsyncThunk(
  "cartItems/fetchCartItems",
  async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/cart`);
    if (!res.ok) throw new Error("Failed to fetch cart items");
    return res.json(); // should return an array of items
  }
);

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
