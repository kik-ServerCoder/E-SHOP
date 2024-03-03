import React from 'react';


const Logout = () => {
  return (
    <div data-theme="nord" className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl font-bold text-green-800 mb-8">Logout Successful</h1>
      
      <div className="flex space-x-4">
       
          <a href="/registration/login"className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Login
          </a>
        

     
          <a href="/registration/signup"className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out">
            Signup
          </a>
       

    
          <a href="/"className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out">
            Home
          </a>
 
      </div>
    </div>
  );
};

export default Logout;
