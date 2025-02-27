// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the authSlice
import cartReducer from './cartSlice'; // Import cartSlice


const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth reducer to the store
    cart: cartReducer, // Add cart reducer to store
  },
});

export default store;

