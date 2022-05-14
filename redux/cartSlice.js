import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.quantity * action.payload.price;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});
export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
