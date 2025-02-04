'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();  // Get the Next.js router instance

  useEffect(() => {
    // Function to check if user is authenticated
    const checkAuthentication = () => {
      const authToken = localStorage.getItem('auth_token');
      const client = localStorage.getItem('client');
      const expiry = localStorage.getItem('expiry');
      const uid = localStorage.getItem('uid');
      const bearer = localStorage.getItem('bearer');
  
      if (authToken && client && expiry && uid && bearer) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    
    // Check authentication when the component mounts or whenever pathname changes
    checkAuthentication();

  }, [router.pathname]);  // Depend on pathname to trigger check when the route changes

  const handleSignOut = () => {
    // Remove auth data from localStorage when the user signs out
    localStorage.removeItem('auth_token');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    localStorage.removeItem('uid');
    localStorage.removeItem('bearer');

    // Update state to reflect that the user is logged out
    setIsAuthenticated(false);

    // Use router.push to navigate without refreshing the page
    router.push('/signin'); // This will navigate without reloading the page
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
