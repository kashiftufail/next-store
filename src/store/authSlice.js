import { createSlice } from '@reduxjs/toolkit';

// Set the initial state for authentication
const initialState = {
  isAuthenticated: false, // Default to not authenticated
};

// Create a slice to manage authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.isAuthenticated = false;

      // Clear all relevant items from localStorage (only on client-side)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('client');
        localStorage.removeItem('expiry');
        localStorage.removeItem('uid');
        localStorage.removeItem('bearer');
      }
    },
    // Action to set the authentication state from localStorage
    setAuthStateFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        // const authToken = localStorage.getItem('auth_token');
        // state.isAuthenticated = !!authToken; // If token exists, set authenticated to true

        const authToken = localStorage.getItem('auth_token');
        const client = localStorage.getItem('client');
        const expiry = localStorage.getItem('expiry');
        const uid = localStorage.getItem('uid');
        const bearer = localStorage.getItem('bearer');
        
        // If all required data exists, mark as authenticated
        state.isAuthenticated = authToken && client && expiry && uid && bearer ? true : false;

      }
    },
  },
});

// Export actions for use in components
export const { signIn, signOut, setAuthStateFromStorage } = authSlice.actions;

// Export the reducer to use in the store configuration
export default authSlice.reducer;

