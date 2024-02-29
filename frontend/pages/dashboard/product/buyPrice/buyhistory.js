import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';


const Viewbuytracking = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setError('Error fetching product  buy tracking list. Please try again.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, []); 

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
    return <div className="text-center">No products found.</div>;
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
      
    </div>
  );
};

export default Viewbuytracking;
