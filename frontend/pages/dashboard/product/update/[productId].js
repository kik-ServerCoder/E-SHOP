import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditProduct = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [productData, setProductData] = useState({
    prod_name: '',
    prod_code: '',
    prod_price: '',
    prod_sku: '',
    prod_sellprice: '',
    prod_buyprice: '',
    prod_totalSP: '',
    prod_totalBP: '',
    prod_totalPrice: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          router.push("/");
          return;
        }

        const response = await axios.get(`http://localhost:3000/product/getproduct/${productId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          setProductData(response.data);
          setError(null); 
        } else {
          setError('Error fetching product data');
        }
      } catch (error) {
        setError(`Error fetching product data: ${error.message}`);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.put(`http://localhost:3000/product/editproduct/${productId}`, productData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        router.push("/dashboard/product/allproducts");
      } else {
        setError(`Error updating product: ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error updating product: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
         
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
               Enter Product ID:
              <input type="text" name="prod_ID" value={productId || ''} readOnly className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>

          
          {Object.keys(productData).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-800">
                {key}:
                <input type="text" name={key} value={productData[key] || ''} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
              </label>
            </div>
          ))}

          
          <button type="button" onClick={handleUpdateProduct} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
