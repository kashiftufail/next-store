'use client';

import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the token information from localStorage
    const accessToken = localStorage.getItem('auth_token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');
    const expiry = localStorage.getItem('expiry');
    const bearer = localStorage.getItem('bearer');

    console.log(accessToken);
    console.log(client);
    console.log(uid);
    console.log(bearer);

    // Check if all the necessary tokens are present
    if (!accessToken || !client || !uid || !expiry) {
      setError('Authorization token information is missing');
      return;
    }

    // Fetch products from the Rails API
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3003/api/v1/products', {
        method: 'GET',
        headers: {
          "access-token": `${accessToken}`,
          "client":       client,
          "expiry":       expiry,
          "uid":          uid
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Authorization token is invalid or expired');
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-20 mb-5">Product Listings</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              >
                {/* Product image */}
                <div
                  className="w-full h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image_url})` }}
                ></div>

                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
                  {/* Product name */}
                  <h2 className="text-2xl font-semibold text-white">{product.name}</h2>
                  {/* Product price */}
                  <p className="text-lg text-white mt-2">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No products available.</p>
        )}
      </div>
    </div>
  );
}
