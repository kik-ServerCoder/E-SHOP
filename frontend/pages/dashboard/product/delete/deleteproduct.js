import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const deleteproduct = () => {
  const router = useRouter();
  const [productdelId, setProductdelId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setProductdelId(e.target.value);
    setError('');
  };

  const handleCheckProduct = async () => {
    try {
      setLoading(true);

      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        router.push('/');
        return;
      }

      const response = await axios.get(`http://localhost:3000/product/getproduct/${productdelId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data) {
        router.push(`/dashboard/product/delete/${productdelId}`);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError('Error fetching product data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Enter Product ID to Delete</h1>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <input
            type="text"
            value={productdelId}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </label>
        <button
          type="button"
          onClick={handleCheckProduct}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 mt-4"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Enter Here'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default deleteproduct;
