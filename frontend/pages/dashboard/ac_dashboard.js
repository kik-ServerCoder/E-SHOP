import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ac_dashboard = () => {
  const router = useRouter();
  useEffect(()=> {
  const authToken = localStorage.getItem('authToken');
  if(!authToken){
    router.push("/")
  }})
  
  return (
    <div className="flex flex-wrap justify-center ml-40 mr-40">
   
      <Link href="./product/addproduct">
        <div className=" bg-gray-200 text-gray-800 font-bold p-8 m-4 w-72 h-56 flex items-center justify-center hover:bg-gray-300">
         Add Product
        </div>
      </Link>
      <Link href="./product/allproducts">
        <div className=" bg-gray-200 text-gray-800 font-bold p-8 m-4  w-72 h-56 flex items-center justify-center hover:bg-gray-300">
          View All Products
        </div>
      </Link>
      <Link href="./product/update/editproduct">
        <div className=" bg-gray-200 text-gray-800 font-bold p-8 m-4  w-72 h-56 flex items-center justify-center hover:bg-gray-300">
          Update Product
        </div>
      </Link>
      <Link href="./product/buyPrice/addbuyprice">
        <div className=" bg-green-500 text-white font-bold p-8 m-4 w-48 h-36 flex items-center justify-center hover:bg-green-400">
          Add Buy Price
        </div>
      </Link>
      <Link href="./product/sellprice/addsellprice">
        <div className=" bg-red-500 text-white font-bold p-8 m-4 w-48 h-36 flex items-center justify-center hover:bg-red-400">
          Add Sell Price
        </div>
      </Link>
      
    
    </div>
  );
};


export default ac_dashboard;
