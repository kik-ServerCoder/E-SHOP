import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditProductIndex = () => {
  const router = useRouter();
  const [productcode, setProductcode] = useState('');

  const handleInputChange = (e) => {
    setProductcode(e.target.value);
  };

  const handleCheckProduct = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        router.push('/');
        return;
      }

      const response = await axios.get(`http://localhost:3000/product/getproductwithcode/${productcode}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

    

      if (response.data) {
       
        router.push(`/dashboard/product/update/${productcode}`);
      } else {
        console.log('Product not found');
       
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Search with Product Code to update</h1>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          
          <input
            type="text"
            value={productcode}
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
