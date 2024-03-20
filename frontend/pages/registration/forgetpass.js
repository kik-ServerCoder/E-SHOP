import React, { useState } from 'react';
import axios from 'axios';
import Link from "next/link";

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/reg/forgot-password', { username });

      setMessage(response.data.message);
      setResetToken(response.data.resetToken);
    } catch (error) {
      setMessage('Error initiating password reset.');
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <button
          onClick={handleForgotPassword}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Get token
        </button>
        <p className="mt-4 text-green-500">{message}</p>
        {resetToken && (
          <div className="mt-4">
            <p className="font-semibold">Reset Token make sure to save it to change passsword:</p>
            <code className="bg-gray-200 p-2 rounded">{resetToken}</code>
          </div>
        )}
      </div>
      {resetToken && (<Link href="./resetpass">
        <div className="bg-gray-300 text-gray-800 font-bold p-8 m-4 w-64 h-48 flex items-center justify-center hover:bg-gray-400">
          Go to Reset Page
        </div></Link>
      )}
    </>
  );
};

export default ForgotPassword;
