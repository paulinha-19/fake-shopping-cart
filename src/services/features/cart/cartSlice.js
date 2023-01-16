import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1 //0
        };
        toast.info("Already aded on cart", {
          position: "top-left"
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success(`${action.payload.title} Added on cart`, {
          position: "top-left"
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increasingItemCart(state, action) {
      const existingIndex2 = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex2 >= 0) {
        state.cartItems[existingIndex2] = {
          ...state.cartItems[existingIndex2],
          cartQuantity: state.cartItems[existingIndex2].cartQuantity + 1
        };
        toast.info(
          `You have Added ${action.payload.cartQuantity + 1} Quenty `,
          {
            position: "top-left"
          }
        );
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success(`${action.payload.name} Added on cart`, {
          position: "top-left"
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
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Produto removido totalmente do carrinho", {
            position: "top-left"
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotalCart(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("O carrinho foi limpo", { position: "top-left" });
    }
  }
});

export const {
  addItemCart,
  increasingItemCart,
  decreaseItemCart,
  removeItemCart,
  getTotalCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
