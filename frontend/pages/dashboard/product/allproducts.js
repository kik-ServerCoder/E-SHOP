import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";

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

        const response = await axios.get('http://localhost:3000/product/getallproductlists/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

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
  
  if (product.length === 0) {
    return <div className="text-center">No products found.</div>;
  }

  
  const columnLabels = {
    prod_ID: 'ID',
    prod_code: 'Code',
    prod_name: 'Name',
    prod_sku: 'Left SKU',  
    prod_sellprice: 'Last Sell Price',
    prod_totalSP: 'Total Sell Price',
    prod_buyprice: 'Last Buy Price ',
    prod_totalBP: 'Total Buy Price',
    createdAt: 'Creation',
    username: 'Accountant',
  };

  return (
    <div className="mt-8 overflow-x-auto max-w-screen-xl ml-4 mr-2">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <table className="w-full bg-white border border-gray-300 rounded-md mx-auto shadow-md">
  <thead>
    <tr className="bg-gray-200">
      {Object.keys(product[0]).map((key) => (
        <th key={key} className="py-3 px-6 font-semibold text-left text-sm uppercase border-b">
          {columnLabels[key] || key}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {product.map((item, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
        {Object.values(item).map((value, subIndex) => (
          <td key={subIndex} className="py-2 px-6 border-b">
            {value}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>


      <div className="flex justify-center items-center">
        <Link href="./addproduct">
          <div className="bg-green-400 text-white font-bold p-8 m-4 w-48 h-16 flex items-center justify-center hover:bg-green-300">
            Add Product
          </div>
        </Link>
        <Link href="./update/editproduct">
          <div className="bg-orange-600 text-white font-bold p-8 m-4 w-48 h-16 flex items-center justify-center hover:bg-orange-400">
            Update Product
          </div>
        </Link>
        <Link href="./delete/deleteproduct">
          <div className="bg-red-600 text-white font-bold p-8 m-4 w-48 h-16 flex items-center justify-center hover:bg-red-300">
            Delete Product
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ViewProduct;
