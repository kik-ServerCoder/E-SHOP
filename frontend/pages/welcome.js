import React, { useEffect, useState } from "react";
import Login from './registration/login';
import { Link } from "react-router-dom";


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
    <div className="flex justify-center items-center h-80vh ml-40 mr-40">
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
        <h1 className="text-3xl font-bold mb-4 ">
          Manage Your daily product buy and sell
        </h1>
     
          <a href="/dashboard/ac_dashboard"><p className=""> Let's go</p ></a>
  
      </>
    </>;
  }
})()}
       
      </div>
    </div>
  );
};

export default Welcome;
