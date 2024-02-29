import React, { useState } from 'react';
import axios from 'axios';
import Link from "next/link";
const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/reg/reset-password/' + token, {
        newPassword,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <label className="block mb-2">
        Token:
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <label className="block mb-2">
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <button
        onClick={handleResetPassword}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Reset Password
      </button>
      <p className="mt-4 text-green-500">{message}</p>{message && (<Link href="/">
     <div className="bg-gray-300 text-gray-800 font-bold p-8 m-4 w-64 h-48 flex items-center justify-center hover:bg-gray-400">
       Login
     </div></Link>
   )}
    </div>
     
  );
};

export default ResetPassword;
