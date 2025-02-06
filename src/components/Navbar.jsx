// 'use client';
// import React, { useEffect } from 'react';
// import Link from 'next/link';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation'; // Import useRouter for navigation
// import { signOut } from '../store/authSlice';  // Import signOut action

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const router = useRouter();
  
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  // Use Redux to check authentication

//   const handleSignOut = () => {
//     // Remove auth data from localStorage when the user signs out
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('client');
//     localStorage.removeItem('expiry');
//     localStorage.removeItem('uid');
//     localStorage.removeItem('bearer');

//     // Dispatch signOut action to update Redux state
//     dispatch(signOut());

//     // Navigate to sign-in page without reloading the page
//     router.push('/signin');
//   };

//   return (
//     <nav style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
//       <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
//         <li style={{ marginRight: '1rem' }}>
//           <Link href="/home">Home</Link>
//         </li>
//         <li style={{ marginRight: '1rem' }}>
//           <Link href="/contact">Contact</Link>
//         </li>
//         <li style={{ marginRight: '1rem' }}>
//           <Link href="/about">About</Link>
//         </li>
//         <li style={{ marginRight: '1rem' }}>
//           <Link href="/products">Products</Link>
//         </li>
//         {/* Conditionally render Sign In/Sign Out links */}
//         {isAuthenticated ? (
//           <li style={{ marginRight: '1rem' }}>
//             <button onClick={handleSignOut}>Sign Out</button>
//           </li>
//         ) : (
//           <>
//             <li style={{ marginRight: '1rem' }}>
//               <Link href="/signin">Sign In</Link>
//             </li>
//             <li>
//               <Link href="/signup">Sign Up</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }












import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
import { signOut } from '../store/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cartItemCount = 3;

  // Effect to check authentication status on mount or pathname change
  useEffect(() => {
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
  }, [router.pathname]);

  const handleSignOut = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    localStorage.removeItem('uid');
    localStorage.removeItem('bearer');
    dispatch(signOut());
    router.push('/signin');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6 items-center">
          <Link href="/" className="text-white font-bold text-xl">MyBrand</Link>

          <div className="hidden md:flex space-x-6 ml-8">
            <Link href="/home" className="text-white hover:text-gray-300 transition duration-300">Home</Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition duration-300">Contact</Link>
            <Link href="/about" className="text-white hover:text-gray-300 transition duration-300">About</Link>
            <Link href="/products" className="text-white hover:text-gray-300 transition duration-300">Products</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaShoppingCart size={24} className="text-white" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
            )}
          </div>

          <div className="relative">
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer flex items-center space-x-2">
              <BsFillPersonFill size={24} className="text-white" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-4 space-y-2 border border-gray-200">
                {/* Username if authenticated */}
                {isAuthenticated ? (
                  <p className="font-semibold text-gray-800">
                    John Doe
                  </p>  // Replace with actual user name
                ) : (
                  <p className="text-gray-600">
                    Not signed in
                  </p>
                )}


                {/* Links to favorite and cart */}
                <Link href="/products/favorites" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                  <FiHeart size={18} />
                  <span>Favorites</span>
                </Link>
                <Link href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                  <FaShoppingCart size={18} />
                  <span>Shopping Cart</span>
                </Link>

                {/* Sign out or sign in */}
                {isAuthenticated ? (
                  <button onClick={handleSignOut} className="text-red-500 hover:text-red-700 w-full text-left">
                    Sign Out
                  </button>
                ) : (
                  <Link href="/signin" className="text-blue-500 hover:text-blue-700 w-full text-left">
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
