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
        <span className="text-xl font-bold">E-Shop.</span>
      </div>

      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <b>Home</b>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <b>About</b>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <b>Contact us</b>
            </Link>
          </li>
          <li>
            <div>
{isLoggedIn?(<Link href="/dashboard/accountant/ac_dashboard">
              <b>Dashboard</b>
            </Link>):( <span className="mr-2">
             
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
