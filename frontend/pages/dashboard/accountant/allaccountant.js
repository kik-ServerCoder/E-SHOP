
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const AllAccountant = () => {
    const router = useRouter();
  const [accountantList, setAccountantList] = useState([]);

  useEffect(() => {
  
    const fetchAccountantList = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
      
        if (!authToken) {
            router.push("/");
          
          return;
        }
        const response = await axios.get('http://localhost:3000/accountant/getallaccountantlists/',{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          console.log(response.data)
        setAccountantList(response.data);
      } catch (error) {
        console.error('Error fetching accountant list:', error);
      
      }
    };

    fetchAccountantList();
  }, []); 

  return (
<div className="flex flex-col items-center justify-center h-screen">
  <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-md ml-8 mr-8 shadow-md p-8">
    <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 ">All Accountants</h1>
    <div className="grid grid-cols-4 gap-4 text-gray-800 ">
      <div className="font-semibold text-center">ID</div>
      <div className="font-semibold text-center">Name</div>
      <div className="font-semibold text-center">Email</div>
      <div className="font-semibold text-center">Username</div>

      {accountantList.map((accountant) => (
        <React.Fragment key={accountant.acct_ID}>
          <div className="text-center">{accountant.acct_ID}</div>
          <div className="text-center">{accountant.name}</div>
          <div className="text-center">{accountant.email}</div>
          <div className="text-center">{accountant.username}</div>
        </React.Fragment>
      ))}
    </div>
  </div>
 
</div>



  


  );
};

export default AllAccountant;
