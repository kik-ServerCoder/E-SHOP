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
    <div className="flex flex-wrap justify-center mt-6 ml-40 mr-40">
   
      <Link href="./product/addproduct">
        <div className=" bg-blue-100 text-2xl text-gray-800 font-bold p-8 m-4 w-72 h-48 flex items-center justify-center hover:bg-blue-200">
         Add Product
        </div>
      </Link>
      <Link href="./product/allproducts">
        <div className=" bg-blue-100 text-2xl text-gray-800 font-bold p-8 m-4  w-72 h-56 flex items-center justify-center hover:bg-blue-200">
          View All Products
        </div>
      </Link>
      <Link href="./product/update/editproduct">
        <div className=" bg-blue-100 text-2xl text-gray-800 font-bold p-8 m-4  w-72 h-48 flex items-center justify-center hover:bg-blue-300">
          Update Product
        </div>
      </Link>
      <Link href="/dashboard/product/buyPrice/buyhistory">
        <div className=" bg-green-100 text-black font-bold p-8 m-4 w-38 h-24 flex items-center justify-center hover:bg-green-200">
        Buy History
        </div>
      </Link>
      
      <Link href="./product/buyPrice/addbuyprice">
        <div className=" bg-green-300 text-black font-bold p-8 m-4 w-48 h-36 flex items-center justify-center hover:bg-green-500">
          Add Buy Price
        </div>
      </Link>
      <Link href="./product/sellprice/addsellprice">
        <div className=" bg-red-300 text-black font-bold p-8 m-4 w-48 h-36 flex items-center justify-center hover:bg-red-500">
          Add Sell Price
        </div>
      </Link>
      <Link href="/dashboard/product/sellprice/sellhistory">
        <div className=" bg-red-100 text-black font-bold p-8 m-4 w-38 h-24 flex items-center justify-center hover:bg-red-200">
         Sell History
        </div>
      </Link>
      
    </div>
  );
};


export default ac_dashboard;
