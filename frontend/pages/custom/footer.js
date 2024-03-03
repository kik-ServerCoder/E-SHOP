
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
          
          <button onClick={handleLogout} className="text-white ml-auto cursor-pointer">
        Logout
      </button>
        )}</div>
     
    </div>
   
  );
};

export default Footer;
