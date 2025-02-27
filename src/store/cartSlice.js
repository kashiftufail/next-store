// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load cart state from localStorage
const loadCartState = () => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (err) {
    console.error('Failed to load cart state from localStorage', err);
    return [];
  }
};

// Initial state from localStorage or default empty cart
const initialState = {
  cartItems: loadCartState(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }

      // Persist cart to localStorage after adding to cart
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.product.id !== action.payload);

      // Persist cart to localStorage after removing from cart
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems'); // Remove cart from localStorage
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
