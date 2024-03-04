import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Footer = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
 

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
       alert('No authToken found in localStorage');
        
        return;
      }

      await axios.post("http://localhost:3000/reg/logout", null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      
      localStorage.removeItem('authToken');
      localStorage.removeItem('accountantName');

     
      router.push("/registration/logout");
    } catch (error) {
      
      alert('Logout failed with error:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 md:p-4 flex items-center mt-10">
      <div className="mb-4 md:mb-0 ml-14 md:mr-4">
        <div className="mt-100 ml-40 mr-40">
          <p className="text-white font-bold text-4xl mb-2">E-Shop<span className="text-red-500">.</span></p>
          <p className="text-white ml-1 font-bold text-sm mb-2">
            Copyright©eshop All Rights Reserved
          </p>
        </div>
        
      </div>

      <div>{!isLoggedIn ? (
          <>
           
            <span className="mr-2">
             
            </span>
            
          </>
        ) : (
          <>  <button
          onClick={handleLogout}
          className="text-red-600 ml-auto cursor-pointer font-bold hover:bg-white py-2 px-4 rounded"
        >
          Logout
        </button>
        <button
          onClick={() => router.back()}
          className="text-white ml-4 cursor-pointer bg-gray-800 hover:bg-gray-600 py-2 px-4 rounded"
        >
          Go Back
        </button>
            <Link href="/about">
              <b className="text-gray-300 ml-4 cursor-pointer bg-gray-800 hover:bg-gray-600 py-2 px-4 rounded">About</b>
            </Link>
            <Link href="/">
              <b className="text-gray-300 ml-4 cursor-pointer bg-gray-800 hover:bg-gray-600 py-2 px-4 rounded">Home</b>
            </Link>
          
      </>
          
      
        )}</div>
     
    </div>
   
  );
};

export default Footer;
