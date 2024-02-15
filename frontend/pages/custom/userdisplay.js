import { useState, useEffect } from 'react';

const UserDisplay = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountantName, setAccountantName] = useState('');

  useEffect(() => {
    
    const token = localStorage.getItem('authToken');
    const storedAccountantName = localStorage.getItem('accountantName');

    if (token && storedAccountantName) {
      setLoggedIn(true);
      setAccountantName(storedAccountantName);
    } else {
      setLoggedIn(false);
      setAccountantName('');
    }
  }, []);

  return (
    <div className="flex items-center">
      {loggedIn ? (
        <>
          <span className="mr-2">{accountantName}</span>
          <img src="/logo/userlogo.svg" alt="User Logo" className="w-8 h-8" />
        </>
      ) : (
        <span> N/A </span>
      )}
    </div>
  );
};

export default UserDisplay;
