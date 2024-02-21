
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const UpdateAccountant = () => {
  const router = useRouter();
  const [accountant, setAccountant] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedAccountant, setEditedAccountant] = useState({
    name: '',
    email: '',
    username: ''
  });

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


        setAccountant(response.data);
        setEditedAccountant(response.data); 

        setLoading(false);
      } catch (error) {
        console.error('Error fetching accountant:', error);
        setError('Error fetching accountant. Please try again.');
        setLoading(false);
      }
    };

    fetchAccountant();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAccountant((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
    
      if (!authToken) {
        router.push("/");
        return;
      }

      await axios.patch('http://localhost:3000/accountant/editaccountant/', editedAccountant, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      router.push("/dashboard/ac_dashboard");
    } catch (error) {
      console.error('Error saving changes:', error);
  
    }
  };

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
        <form>
          <div className="grid grid-cols-2 gap-4 text-gray-800 ">
            <div className="font-semibold text-right">Name:</div>
            <div>
              <input
                type="text"
                name="name"
                placeholder={accountant.name}
                value={editedAccountant.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="font-semibold text-right">Email:</div>
            <div>
              <input
                type="text"
                name="email"
                placeholder={accountant.email}
                value={editedAccountant.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="font-semibold text-right">Username:</div>
            <div>
              <input
                type="text"
                name="username"
                placeholder={accountant.username}
                value={editedAccountant.username}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="bg-gray-800 text-white px-4 py-2 rounded"
              onClick={handleSaveChanges}
            >
              Save 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountant;
