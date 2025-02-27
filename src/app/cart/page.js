// src/pages/products/cart.js
'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice'; // Import the remove action

const Cart = () => {
  // Access cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Handle remove item action
  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Products in Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl">Your cart is empty</p>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="relative bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                <div
                  className="w-full h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.product.images[0]})` }} // Display default image
                ></div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{item.product.name}</h2>
                  <p className="text-lg text-gray-600 mt-2">${item.product.price}</p>
                  <p className="mt-2">Quantity: {item.quantity}</p>
                  <button
                    onClick={() => handleRemoveItem(item.product.id)} // Remove product from cart
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
