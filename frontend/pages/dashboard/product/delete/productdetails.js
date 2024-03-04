import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProductDetails = ({ productdelId }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
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

        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productdelId, router]);

  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        router.push('/');
        return;
      }

      await axios.delete(`http://localhost:3000/product/deleteproduct/${productdelId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

     
      router.push('/dashboard/product/delete/deleteproduct');
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  				
  return (
  
    <div className="flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      {product ? (
        <div>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Product ID</td>
                <td className="py-2 px-4">{product.prod_ID}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Product Code</td>
                <td className="py-2 px-4">{product.prod_code}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Product Name</td>
                <td className="py-2 px-4">{product.prod_name}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Product Unit</td>
                <td className="py-2 px-4">{product.prod_sku}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Product Sell Price</td>
                <td className="py-2 px-4">{product.prod_sellprice}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Product Total Sell Price</td>
                <td className="py-2 px-4">{product.prod_totalSP}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Product Buy Price</td>
                <td className="py-2 px-4">{product.prod_buyprice}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Product Total Buy Price</td>
                <td className="py-2 px-4">{product.prod_totalBP}</td>
              </tr>
              
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Accountant Username</td>
                <td className="py-2 px-4">{product.username}</td>
              </tr>
            </tbody>
          </table>
          <div  className="bg-red-500 flex justify-center text-white py-2 px-4 rounded hover:bg-red-600 mt-4"> <button
            onClick={handleDelete}
          >
            Delete Product
          </button></div>
         
        </div>
      ) : (
        <p className="text-red-500">Product not found</p>
      )}
    </div>
  </div>
      );
    };
  

export default ProductDetails;

