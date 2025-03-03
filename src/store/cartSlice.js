// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Utility function to get cart from localStorage
const getCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

// Initial state with cart items from localStorage
const initialState = {
  cartItems: getCartFromLocalStorage(),
};

// Create slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));  // Persist cart in localStorage
    },
    removeFromCart(state, action) {
      const updatedCart = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
      state.cartItems = updatedCart;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));  // Persist updated cart in localStorage
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify([]));  // Clear cart in localStorage
    },
    loadCartFromStorage(state) {
      const savedCart = getCartFromLocalStorage();
      state.cartItems = savedCart; // Load cart from localStorage
    }
  },
});

export const { addToCart, removeFromCart, clearCart, loadCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
