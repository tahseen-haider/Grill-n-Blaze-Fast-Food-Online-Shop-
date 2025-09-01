import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cartItems/fetchCartItems",
  async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch cart items");
    return await res.json();
  }
);

// ✅ Remove or decrement item
export const removeCartItem = createAsyncThunk(
  "cartItems/removeCartItem",
  async ({ _id }, { getState }) => {
    const state = getState();
    const item = state.cartItems.items.find((i) => i._id === _id);

    if (item && item.quantity > 1) {
      // ✅ Decrement quantity
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/cart/update/${_id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity - 1 }),
        }
      );
      if (!res.ok) throw new Error("Failed to update cart item");
      const data = await res.json();
      return data.updatedItem;
    }

    // ✅ Always send DELETE if item doesn't exist or quantity === 1
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/cart/${_id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Failed to remove cart item");
    const data = await res.json();
    return { id: data.id || _id };
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      const { _id } = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else state.items = state.items.filter((i) => i._id !== _id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload; // ✅ Replace with backend data
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload._id) {
          const idx = state.items.findIndex((i) => i._id === payload._id);
          if (idx >= 0) state.items[idx] = payload;
        } else if (payload.id) {
          state.items = state.items.filter((i) => i._id !== payload.id);
        }
      });
  },
});

export const { addToCart, removeItem } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
