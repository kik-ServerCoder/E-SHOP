import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:3000/reg/login", {
        username,
        pass,
      });

      if (response.status === 200) {
        const { identity, message,userdata } = response.data;
        console.log(identity);
        
        const accountantName = userdata.name;

   
        localStorage.setItem('authToken', identity);
        localStorage.setItem('accountantName', accountantName);

        setError('');


       router.push("/welcome");
      } else {
        setError(`Login failed: ${message}`);
        console.error("Login failed");
      }
    } catch (error) {
      setError(`Login failed, Check username/password}`);
      console.error('Login failed with error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-creamwhite p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="username" className="mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="border p-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="border p-2 rounded mb-4"
          value={pass} 
          autoComplete={"off"}
          onChange={(e) => setPassword(e.target.value)}
        />
       
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="text-right mb-4">
          <Link href="/registration/forgetpass" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="bg-gray-800 text-white p-2 rounded cursor-pointer">
          <b>Sign In</b>
        </button>
      </form>

      <div className="mt-4 text-center">
        Don't have an account?{" "}
        <Link href="/registration/signup" className="text-blue-500 font-bold">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
