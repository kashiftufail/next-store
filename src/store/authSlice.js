import { createSlice } from '@reduxjs/toolkit';

// Get the initial authentication state from localStorage, if available
const initialState = {
  isAuthenticated: !!localStorage.getItem('auth_token'), // Check if there's a token in localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      
      // Clear all relevant items from localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('client');
      localStorage.removeItem('expiry');
      localStorage.removeItem('uid');
      localStorage.removeItem('bearer');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
