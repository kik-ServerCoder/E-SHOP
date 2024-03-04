

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";


const viewAccountant = () => {
  const router = useRouter();
  const [accountant, setAccountant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountant = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
      
        if (!authToken) {
          router.push("/");
          return;
        }

        const response = await axios.get('http://localhost:3000/accountant/getaccountant/',{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log(response.data); 

        if (Array.isArray(response.data)) {
          setAccountant(response.data);
        } else {
          setAccountant([response.data]); 
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching accountant list:', error);
        setError('Error fetching accountant list. Please try again.');
        setLoading(false);
      }
    };

    fetchAccountant();
  }, []); 

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error} Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-md ml-8 mr-8 shadow-md p-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 "> Accountant</h1>
      <div className="grid grid-cols-4 gap-4 text-gray-800 ">
          <div className="font-semibold text-center">ID</div>
          <div className="font-semibold text-center">Name</div>
          <div className="font-semibold text-center">Email</div>
          <div className="font-semibold text-center">Username</div>

          {accountant.length === 0 ? (
            <div className="text-center text-gray-800">No accountants available.</div>
          ) : (
            accountant.map((accountant) => (
              <React.Fragment key={accountant.acct_ID}>
                <div className="text-center">{accountant.acct_ID}</div>
                <div className="text-center">{accountant.name}</div>
                <div className="text-center">{accountant.email}</div>
                <div className="text-center">{accountant.username}</div>
              </React.Fragment>
            ))
          )} 
        </div>
        <div className="flex justify-center mt-4">
         <Link href="/dashboard/accountant/allaccountant"><div className=" bg-blue-100 text-gray-800 font-bold p-8 m-4 w-48 h-42 flex items-center justify-center hover:bg-gray-400">
         All Accountant
        </div></Link>
        <Link href="/dashboard/accountant/updateaccountant"><div className=" bg-blue-100 text-gray-800 font-bold p-8 m-4 w-48 h-42  flex items-center justify-center hover:bg-gray-400">
          Update Profile
        </div></Link>
       
      </div>
    </div>
    </div>
  );
};

export default viewAccountant;