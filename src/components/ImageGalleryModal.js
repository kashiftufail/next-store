import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ImageGalleryModal = ({ isOpen, onClose, product, setProduct }) => {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [quantity, setQuantity] = useState(1); // Set default quantity to 1
  const dispatch = useDispatch(); // To dispatch actions to Redux store

  const handleImageSelection = (imageId) => {
    setSelectedImageId(imageId);
  };

  const handleSetDefaultImage = async () => {
    const response = await fetch(`http://localhost:3003/api/v1/products/${product.id}/set_default_image`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_id: selectedImageId }),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      setProduct((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? { ...p, images: updatedProduct.images } : p
        )
      ); // Update the products list with the new default image
      onClose(); // Close the modal
    } else {
      console.error('Error setting default image');
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add to cart with the selected quantity
    dispatch(addToCart({ product, quantity }));
    onClose(); // Close modal after adding to cart
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
          <h2 className="text-2xl mb-4">Select a Default Image</h2>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-3 gap-4">
            {product?.images?.map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={image}
                  alt="Product Image"
                  className="w-32 h-32 object-cover mb-2"
                />
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="default-image"
                    checked={selectedImageId === index}
                    onChange={() => handleImageSelection(index)}
                  />
                  <span className="ml-2">Select this image</span>
                </label>
              </div>
            ))}
          </div>

          {/* Quantity Selection */}
          <div className="flex items-center mt-4">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-300 text-xl py-2 px-4 rounded-l"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-12 text-center border-t border-b text-xl"
            />
            <button
              onClick={increaseQuantity}
              className="bg-gray-300 text-xl py-2 px-4 rounded-r"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded" onClick={onClose}>
              Close
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={selectedImageId === null}
              onClick={handleSetDefaultImage}
            >
              Set as Default
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleAddToCart} // Add to cart action
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageGalleryModal;
