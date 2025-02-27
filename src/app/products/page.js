'use client';

import { useEffect, useState } from 'react';
import ImageGalleryModal from '../../components/ImageGalleryModal'; // Import the modal component

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // To track the selected product for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const resetQuantity = () => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      quantity: 1, // Reset to 1 when opening the modal
    }));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('auth_token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');
    const expiry = localStorage.getItem('expiry');

    if (!accessToken || !client || !uid || !expiry) {
      setError('Authorization token information is missing');
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/v1/products', {
          method: 'GET',
          headers: {
            'access-token': `${accessToken}`,
            'client': client,
            'expiry': expiry,
            'uid': uid,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Set the fetched products
        } else {
          setError('Authorization token is invalid or expired');
        }
      } catch (err) {
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  const handleModalOpen = (product) => {
    setSelectedProduct(product); // Set the selected product
    resetQuantity(); // Reset the quantity to 1 whenever the modal opens
    setIsModalOpen(true); // Open modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleAddToCart = (product) => {
    console.log('Add product to cart:', product);
  };

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-red-100 p-4 rounded-md text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-20 mb-5">Product Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div
                className="w-full h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.images[0]})` }} // Default to first image
              ></div>
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
                <h2 className="text-2xl font-semibold text-white">{product.name}</h2>
                <p className="text-lg text-white mt-2">${product.price}</p>
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => handleModalOpen(product)} // Open modal on "Buy" button click
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for image gallery */}
      {selectedProduct && (
        <ImageGalleryModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          product={selectedProduct}
          setProduct={setProducts} // To update the products list after changing the default image
        />
      )}
    </div>
  );
}
