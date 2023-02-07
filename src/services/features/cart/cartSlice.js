import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart(state, action) {
      const { id, ...itemProperties } = action.payload;
      const itemInCart = state.cartItems.findIndex(
        (item) => item.id === id
      );
      if (itemInCart >= 0) {
        const updatedItem = {
          ...state.cartItems[itemInCart],
          cartQuantity: state.cartItems[itemInCart].cartQuantity + 1
        };
        state.cartItems[itemInCart] = updatedItem;
      } else {
        state.cartItems.push({ id, ...itemProperties, cartQuantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseItemInCart(state, action) {
      const { id, ...itemProperties } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === id
      );
      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex].cartQuantity += 1;
      } else {
        state.cartItems.push({
          ...itemProperties,
          id,
          cartQuantity: 1
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseItemCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Produto reduzido do carrinho", {
          position: "top-left"
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error("Produto removido totalmente do carrinho", {
          position: "top-left"
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(nextCartItems));
      return {
        ...state,
        cartItems: nextCartItems
      };
    },
    getTotalCart(state) {
      const { cartItems } = state;
      let total = 0;
      let quantity = 0;
      cartItems.forEach(({ price, cartQuantity }) => {
        total += price * cartQuantity;
        quantity += cartQuantity;
      });
      state.cartTotalAmount = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("O carrinho foi limpo", { position: "top-left" });
    }
  }
});

export const {
  addItemCart,
  increaseItemInCart,
  decreaseItemCart,
  removeItemCart,
  getTotalCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
