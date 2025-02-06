'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { signOut } from '../store/authSlice';  // Import signOut action

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  // Use Redux to check authentication

  const handleSignOut = () => {
    // Remove auth data from localStorage when the user signs out
    localStorage.removeItem('auth_token');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    localStorage.removeItem('uid');
    localStorage.removeItem('bearer');

    // Dispatch signOut action to update Redux state
    dispatch(signOut());

    // Navigate to sign-in page without reloading the page
    router.push('/signin');
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/home">Home</Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/contact">Contact</Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/about">About</Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/products">Products</Link>
        </li>
        {/* Conditionally render Sign In/Sign Out links */}
        {isAuthenticated ? (
          <li style={{ marginRight: '1rem' }}>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        ) : (
          <>
            <li style={{ marginRight: '1rem' }}>
              <Link href="/signin">Sign In</Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

