import { useEffect, useState } from 'react';
import Link from 'next/link';
import UserDisplay from './userdisplay';

const Header = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    }
  }, []);

  return (
    <header data-theme="nord" className="shadow-md p-5 flex justify-between items-center ml-40 mr-40 bg-gray-800 text-white rounded-lg">
      <div className="flex items-center">
          
              <img src="/logo/logo.png" alt="Company Logo" className="w-10 h-8 mr-2 bg-gray-800" />
           
        <span className="text-xl font-bold"><a href='/'>E-Shop.</a></span>
      </div>

      <nav>
        <ul className="flex space-x-4">
         
         
         
          <li>
            <div>
{isLoggedIn?(<> 
        
          <Link href="/dashboard/ac_dashboard" className= "text-gray-200 hover:text-gray-400 font-semibold mr-4 cursor-pointer">
          <b>Dashboard </b>
    
      </Link>

      <Link href="/report" className="text-gray-200 hover:text-gray-400 font-semibold mr-4 cursor-pointer">
        
          <b>Report</b>
        
      </Link></>
        ):( <span className="mr-2">
             
             </span>)}
            </div>
            
            
          </li>
        </ul>
      </nav>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
           
            <span className="mr-2">
              <UserDisplay />
            </span>
            
          </>
        ) : (
          
          <Link href="/">
           <img src="/logo/userlogo.svg" alt="User Logo" className="w-8 h-8" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
