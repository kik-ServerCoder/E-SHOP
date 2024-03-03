import React, { useEffect, useState } from "react";
import Login from './registration/login';



const Welcome = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  
  useEffect(() => { 
    const user = localStorage.getItem("authToken");
    if (user) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);
  return (
    <div className="flex justify-center items-center h-80vh mt-10 ml-40 mr-40">
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to E-SHOP Management</h1>
        <p className="text-lg ">
        Introducing our cutting-edge eShop Management System - a powerful and efficient application designed to streamline your online retail operations. Whether you're a budding entrepreneur or an established business, our app is tailored to simplify the complexities of managing your eShop, allowing you to focus on what matters most - your products and customers.
        </p>
      </div>

      <div className="flex-1 p-16" >
      {(() => {
  if (!isLoggedin) {
    return <Login />;
  } else {
    return <>
      <>
        <h1 className=" text-green-500 text-3xl font-bold mb-4 ">
        Explore Now!
        </h1>
        <h2 className=" text-gray-800 text-xl font-bold mb-4 ">
         Manage your product's buy and sell price and track them.
        </h2>
      <div className=" justify-center items-center ">
        <a href="dashboard/ac_dashboard" className="block">
         
  <div className="bg-cyan-500 text-white font-bold mt-4 p-4 m-4">
    Dashboard
  </div></a>
 <a href="dashboard/accountant/viewaccountant" className="block ">
  <div className="bg-orange-500 text-white ml-16 mr-16 font-bold p-4 m-4">
   Profile
  </div></a>
</div>

  
      </>
    </>;
  }
})()}
       
      </div>
    </div>
  );
};

export default Welcome;
