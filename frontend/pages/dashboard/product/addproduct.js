import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddProductForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prod_code: '',
    prod_name: '',
    
    prod_sku: '',
  
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      

      return newData;
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        router.push("/");
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/product/addproduct',
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (parseInt(response.prod_sku) <= 0) {
        throw new Error('Product SKU must be a positive value.');
      }

      if (response.status === 201) {
        router.push('/dashboard/product/buyPrice/addbuyprice');

        setFormData({
          prod_code: '',
          prod_name: '',
         
          prod_sku: '',
        
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      if (error.response && error.response.status === 500) {
        
        setError('Product code must be unique.');
      }
if (error.response.status == 500){
        setError (`Code must be unique`)
       }
      else if (error.response) {
       
        setError(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        
        setError('No response received from the server');
      } else {
        
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Code:</label>
            <input
              type="text"
              name="prod_code"
              value={formData.prod_code}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              name="prod_name"
              value={formData.prod_name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Quantity:</label>
            <input
              type="number"
              name="prod_sku"
              value={formData.prod_sku}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div> */}
          

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
