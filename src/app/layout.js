'use client';  // Ensure it's a Client Component

import { Provider } from 'react-redux'; 
import { useEffect, useState } from 'react';
import store from '../store/store';  // Import the Redux store
import { setAuthStateFromStorage } from '../store/authSlice';
import { loadCartFromStorage } from '../store/cartSlice'; // Action to load cart from localStorage
import Navbar from '../components/Navbar.jsx';
import './globals.css';

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false); // Track whether the client-side code has mounted

  useEffect(() => {
    setIsClient(true); // Mark as client-side after the component mounts

    // Only dispatch on the client-side
    store.dispatch(setAuthStateFromStorage()); // Load auth state from localStorage
    store.dispatch(loadCartFromStorage()); // Load cart items from localStorage
  }, []);

  // Always wrap the component tree with Provider
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:8097"></script>
      </head>
      <body>
        <Provider store={store}>  {/* Always wrap the components with Provider */}
          {isClient && ( // Ensure content only renders after the component mounts
            <>
              <Navbar />
              {children}
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}
