import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; // For redirecting after successful signup
import loginimage from '../assets/loginimage.png';


function SignUp() {
   // State to store form inputs
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState(''); // To store validation errors
   const navigate = useNavigate(); // For navigation after successful signup

   // Handle form submission
   const handleSubmit = (e) => {
     e.preventDefault(); // Prevent the form from refreshing the page

     // Validate the form inputs
     if (!name || !email || !password || !confirmPassword) {
       setError('All fields are required');
       return;
     }

     if (password !== confirmPassword) {
       setError('Passwords do not match');
       return;
     }

     // If validation passes, proceed with signup logic
     // For example, send data to backend (just log here)
     console.log({ name, email, password });

     // After successful signup, navigate to login page
     navigate('/login');
   };

   return (
      <div className="flex h-screen bg-[#321c1c]">
        {/* Left Side Image */}
        <div className="flex justify-center items-center w-1/2">
          <div className="w-120 bg-white p-4 rounded-xl shadow-lg">
            <img 
              src={loginimage}
              alt="Memora Illustration" 
              className="rounded-lg w-[450px] h-[550px]"
            />
          </div>
        </div>
  
        {/* Right Side Form */}
        <div className="flex flex-col justify-center w-1/2 px-12">
          <h1 style={{ fontFamily: 'Anclonica', fontWeight: 'normal', fontStyle: 'normal' }} className="text-4xl font-semibold text-[#d6b692] mb-2">memora</h1>
          <p className="text-[#b89c7d] italic mb-6">"A vault for your journey"</p>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name input */}
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-[#1f1111] text-[#d6b692] placeholder-[#a58d72] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#b89c7d]" 
              placeholder="Name"
            />
            {/* Email input */}
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-[#1f1111] text-[#d6b692] placeholder-[#a58d72] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#b89c7d]" 
              placeholder="Your Email"
            />
            {/* Password input */}
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-[#1f1111] text-[#d6b692] placeholder-[#a58d72] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#b89c7d]" 
              placeholder="Password"
            />
            {/* Confirm Password input */}
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-[#1f1111] text-[#d6b692] placeholder-[#a58d72] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#b89c7d]" 
              placeholder="Confirm Password"
            />
            
            {/* Display error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <button 
                type="submit" 
                className="px-4 py-3 rounded-md bg-[#2d2b2b] text-[#d6b692] font-semibold hover:bg-[#3c3a3a] focus:outline-none focus:ring-2 focus:ring-[#b89c7d]"
              >
                SignUp
              </button>
              
              {/* Link to Login page with styling for only "Login" part */}
              <p className=" text-[#d6b692]">
                Already have an account? 
                <Link 
                  to="/login" 
                  className="text-blue-500 underline hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-[#b89c7d]"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
}

export default SignUp;