// src/pages/products/cart.js
'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../store/cartSlice'; // Import the remove and update actions

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(updateCartQuantity({ productId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(updateCartQuantity({ productId, quantity: -1 }));
  };

  // Calculate total price and tax
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateTax = (total) => {
    return total * 0.08; // Assuming 8% tax rate
  };

  const total = calculateTotal();
  const tax = calculateTax(total);
  const grandTotal = total + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Products in Cart</h1>

      <div className="flex flex-wrap gap-6">
        {/* Left Side: Product List */}
        <div className="flex-1">
          {cartItems.length === 0 ? (
            <p className="text-center text-xl">Your cart is empty</p>
          ) : (
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
                    <div className="flex items-center mt-4">
                      <button
                        onClick={() => handleDecreaseQuantity(item.product.id)}
                        className="bg-gray-300 text-gray-800 py-1 px-2 rounded mr-2"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleIncreaseQuantity(item.product.id)}
                        className="bg-gray-300 text-gray-800 py-1 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
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
          )}
        </div>

        {/* Right Side: Summary Table */}
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="py-2 px-4 text-gray-600">Subtotal:</td>
                <td className="py-2 px-4 text-right text-gray-800">${total.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-gray-600">Tax (8%):</td>
                <td className="py-2 px-4 text-right text-gray-800">${tax.toFixed(2)}</td>
              </tr>
              <tr className="font-semibold">
                <td className="py-2 px-4 text-gray-600">Total:</td>
                <td className="py-2 px-4 text-right text-gray-800">${grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-6 hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
