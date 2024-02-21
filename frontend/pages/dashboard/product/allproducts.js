import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const ViewProduct = () => {
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

        const response = await axios.get('http://localhost:3000/product/getallproductlists/',{
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
        console.error('Error fetching product list:', error);
        setError('Error fetching product list. Please try again.');
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

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(product[0]).map((key) => (
              <th key={key} className="py-2 px-4 font-semibold text-left">{key}</th>
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

export default ViewProduct;
