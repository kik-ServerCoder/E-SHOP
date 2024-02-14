import React from "react";
import Login from './registration/login';

const Welcome = () => {
  return (
    <div className="flex justify-center items-center h-80vh ml-40 mr-40">
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to E-SHOP Management</h1>
        <p className="text-lg ">
        Introducing our cutting-edge eShop Management System - a powerful and efficient application designed to streamline your online retail operations. Whether you're a budding entrepreneur or an established business, our app is tailored to simplify the complexities of managing your eShop, allowing you to focus on what matters most - your products and customers.
        </p>
      </div>

      <div className="flex-1 p-16">
        <Login />
      </div>
    </div>
  );
};

export default Welcome;
