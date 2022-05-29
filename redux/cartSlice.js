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
    decreaseItemFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;

        toast.info(
          `Decreased ${action.payload.attributes.title} cart quantity.`,
          {
            position: "bottom-left",
          }
        );
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItem = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItem;

        toast.error(`${action.payload.attributes.title} removed from cart.`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      toast.error(`Cleared cart.`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals: (state, action) => {
      let { total, cartQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.cartQuantity += quantity;

          return cartTotal;
        },
        { total: 0, cartQuantity: 0 }
      );
      state.cartTotalQuantity = cartQuantity;
      state.cartTotalAmount = total;
    },
  },
});
export const {
  addItemToCart,
  removeItemFromCart,
  decreaseItemFromCart,
  clearCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
