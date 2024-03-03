import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditBuyPrice = () => {
  const router = useRouter();
  const [productbuycode, setProductbuycode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setProductbuycode(e.target.value);
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

      const response = await axios.get(`http://localhost:3000/product/getproductwithcode/${productbuycode}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data) {
        router.push(`/dashboard/product/buyPrice/${productbuycode}`);
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
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheckProduct();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl text-gray-800 font-bold mb-4"> ADD BUY PRICE</h1>
        <h3 className="text-l font-semibold mb-4">Enter Product Code here </h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <input
            type="text"
            value={productbuycode}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} 
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

export default EditBuyPrice;
