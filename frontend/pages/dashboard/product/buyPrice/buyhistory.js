import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { Link } from "react-router-dom";

const Viewbuytracking = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
    
      if (!authToken) {
        router.push("/");
        return;
      }

      const response = await axios.get('http://localhost:3000/product/getbuytracking', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response.data);

      if (Array.isArray(response.data)) {
        setProduct(response.data);
      } else {
        setProduct([response.data]); 
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product buy tracking list:', error);
      setError('Error fetching product buy tracking list. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []); 

  const handleDeleteAllData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        router.push("/");
        return;
      }

      await axios.delete('http://localhost:3000/product/deletebuytracking', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

     
      fetchProduct();
    } catch (error) {
      console.error('Error deleting buy tracking data:', error);
      setError('Error deleting buy tracking data. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="text-center text-red-500">
        {error} Please try again.
      </div>
    );
  }
  
  if (product.length === 0) {
    return <div className="text-center text-red-700">Zero Product sell history has found.  
     
    </div>;
    
  }

  return (
    <div className="mt-8 overflow-x-auto max-w-screen-xl ml-4 mr-2">
      <h1 className="text-3xl font-bold mb-4">Buy Price tracking</h1>
      
    

      <table className="w-full bg-white border border-gray-300 rounded-md mx-auto">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(product[0]).map((key) => (
              <th key={key} className="py-2 font-semibold text-left">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              {Object.values(item).map((value, subIndex) => (
                <td key={subIndex} className="py-2 px-4">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={handleDeleteAllData}
      >
        Delete All Data
      </button>
    </div>
  );
};

export default Viewbuytracking;
