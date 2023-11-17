import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(action.payload);
      const itemInCart = state.data.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.data.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    subtractQuantity: (state, action) => {
      const itemInCart = state.data.find((item) => item.id === action.payload.id);
      if (itemInCart.quantity === 1) {
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      } else {
        itemInCart.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, subtractQuantity } = cartSlice.actions;

export default cartSlice.reducer;
