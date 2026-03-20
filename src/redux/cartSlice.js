import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    AddItem: (state, action) => {
      const existItem = state.find((item) => item?.id === action?.payload.id);
      if (existItem) {
        existItem.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },
    RemoveItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    IncrementQty: (state, action) => {
      return state.map((item) => 
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
    },
    DecrementQty: (state, action) => {
      return state.map((item) => 
        item.id === action.payload ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      );
    },
    ClearCart: () => {
      return [];
    }
  },
});

export const { AddItem, RemoveItem, IncrementQty, DecrementQty, ClearCart } = cartSlice.actions;
export default cartSlice.reducer;
