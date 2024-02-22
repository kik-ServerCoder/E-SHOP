import React from "react";
import Link from "next/link";

const ac_dashboard = () => {
  return (
    <div className="flex flex-wrap justify-center ml-40 mr-40">
      <Link href="./accountant/allaccountant">
        <div className=" bg-gray-300 text-gray-800 font-bold p-8 m-4 w-64 h-56 flex items-center justify-center hover:bg-gray-400">
          All Accountant
        </div>
      </Link>
      <Link href="./accountant/updateaccountant">
        <div className=" bg-gray-300 text-gray-800 font-bold p-8 m-4 w-64 h-56 flex items-center justify-center hover:bg-gray-400">
          Update Profile
        </div>
      </Link>
      <Link href="./accountant/viewaccountant">
        <div className=" bg-gray-300 text-gray-800 font-bold p-8 m-4 w-64 h-56 flex items-center justify-center hover:bg-gray-400">
          View Profile
        </div>
      </Link>
      <Link href="./product/addproduct">
        <div className=" bg-gray-200 text-gray-800 font-bold p-8 m-4 w-72 h-72 flex items-center justify-center hover:bg-gray-300">
         Add Product
        </div>
      </Link>
      <Link href="./product/allproducts">
        <div className=" bg-gray-200 text-gray-800 font-bold p-8 m-4  w-72 h-72 flex items-center justify-center hover:bg-gray-300">
          View All Products
        </div>
      </Link>
      <Link href="./product/updateproduct">
        <div className=" bg-gray-200 text-gray-800 font-bold p-8 m-4  w-72 h-72 flex items-center justify-center hover:bg-gray-300">
          Update Product
        </div>
      </Link>
      <Link href="./product/addbuyprice">
        <div className=" bg-green-100 text-gray-800 font-bold p-8 m-4 w-48 h-36 flex items-center justify-center hover:bg-gray-300">
          Add Buy Price
        </div>
      </Link>
      <Link href="./product/addsellprice">
        <div className=" bg-red-100 text-gray-800 font-bold p-8 m-4 w-48 h-36 flex items-center justify-center hover:bg-gray-300">
          Add Sell Price
        </div>
      </Link>
      
    
    </div>
  );
};


export default ac_dashboard;
