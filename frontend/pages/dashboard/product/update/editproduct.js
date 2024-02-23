import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditProductIndex = () => {
  const router = useRouter();
  const [productId, setProductId] = useState('');

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  const handleCheckProduct = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        router.push('/');
        return;
      }

      const response = await axios.get(`http://localhost:3000/product/getproduct/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response.data);

      if (response.data) {
        // If product exists, navigate to the edit page with productId
        router.push(`/dashboard/product/update/${productId}`);
      } else {
        console.log('Product not found');
        // Handle case where product is not found
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Search with Product ID to update</h1>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          
          <input
            type="text"
            value={productId}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </label>
        <button
          type="button"
          onClick={handleCheckProduct}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 mt-4"
        >
         Enter Here
        </button>
      </div>
    </div>
  );
};

export default EditProductIndex;
