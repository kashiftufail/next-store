import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
import { signOut } from '../store/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Get authentication status from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItemCount = 1;  // Adjust this based on actual cart data

  const handleSignOut = () => {
    // Dispatch signOut action to update Redux state
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
          <Link href="/cart" className="relative">
            <FaShoppingCart size={24} className="text-white" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

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
                    John Doe  {/* Replace with actual user name */}
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Not signed in
                  </p>
                )}

                {/* Links to favorite and cart (only if authenticated) */}
                {isAuthenticated && (
                  <Link href="/products/favorites" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                    <FiHeart size={18} />
                    <span>Favorites</span>
                  </Link>
                )}

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
                    <div className="space-y-2">
                      <Link href="/signin" className="text-blue-500 hover:text-blue-700 w-full text-left">
                        Sign In
                      </Link>
                      <br></br>
                      <Link href="/signup" className="text-blue-500 hover:text-blue-700 w-full text-left">
                        Sign Up
                      </Link>
                    </div>
                  )}

              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

