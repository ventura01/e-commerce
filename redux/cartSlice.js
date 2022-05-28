import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  // cartItems: localStorage.getItem("cartItems")
  //   ? JSON.parse(localStorage.getItem("cartItems"))
  //   : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        toast.info(
          `${action.payload.attributes.title} increased cart quantity.`,
          {
            position: "bottom-left",
          }
        );
      } else {
        const tempItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempItem);
        toast.success(
          `${action.payload.attributes.title} is added new product to cart.`,
          {
            position: "bottom-left",
          }
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // state.cartItems.push(action.payload);
      // state.cartTotalQuantity += 1;
      // state.cartTotalAmount += action.payload.quantity * action.payload.price;
    },
    reset: (state) => {
      state = initialState;
    },
    removeItemFromCart: (state, action) => {
      const nextCartItem = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      state.cartItems = nextCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.attributes.title} is removed from cart.`, {
        position: "bottom-left",
      });
    },
  },
});
export const { addItemToCart, reset, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
