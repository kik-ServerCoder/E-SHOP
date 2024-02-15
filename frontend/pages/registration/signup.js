
import { useState } from 'react';
import axios from 'axios';


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', formData);

      if (response.status === 201) {
        const data = response.data;
        console.log(data);
      } else {
        console.error(response.data); 
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md w-full">
     
        <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    
  
    </>
  );
};

export default SignUp;
