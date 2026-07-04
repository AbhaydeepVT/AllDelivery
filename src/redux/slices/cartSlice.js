import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    lastAddedItem: null,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existing = state.items.find(item => item.id === newItem.id);
      if (!existing) {
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        existing.quantity++;
      }
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      state.lastAddedItem = {
        ...newItem,
        id: newItem.id + '-' + Date.now(),
      };
    },

    removeItem(state, action) {
      const id = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        state.totalQuantity--;
        state.totalAmount -= existing.price;
        if (existing.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existing.quantity--;
        }
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.lastAddedItem = null;
    },

    clearLastAdded(state) {
      state.lastAddedItem = null;
    },

    // New reducer to replace entire cart (e.g., after login)
    setCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      // Optionally, clear the animation trigger
      state.lastAddedItem = null;
    },
  },
});

export const { addItem, removeItem, clearCart, clearLastAdded, setCart } = cartSlice.actions;
export default cartSlice.reducer;