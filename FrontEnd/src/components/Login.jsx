import React from 'react';
 // Import the styles for the login page
import loginimage from '../assets/loginimage.png';

function Login() {
   return (
      <div className="flex h-screen bg-[#321c1c]">
        {/* Left Side Image */}
        <div className="flex justify-center items-center w-1/2">
          <div className="w-120 bg-white p-4 rounded-xl shadow-lg">
            {/* Optionally, add any login image or illustration here */}
            <img 
              src={loginimage}// Replace with the correct image path if needed
              alt="Memora Illustration" 
              className="rounded-lg w-[450px] h-[550px]"
            />
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex flex-col justify-center w-1/2 px-12">
          <h1 style={{ fontFamily: 'Anclonica', fontWeight: 'normal', fontStyle: 'normal' }} className="text-4xl font-semibold text-[#d6b692] mb-2">memora</h1>
          <p className="text-[#b89c7d] italic mb-6">"A vault for your journey"</p>

          <form className="space-y-4">
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-md bg-[#1f1111] text-[#d6b692] placeholder-[#a58d72] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#b89c7d]" 
              placeholder="Your Email"
            />
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-md bg-[#1f1111] text-[#d6b692] placeholder-[#a58d72] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#b89c7d]" 
              placeholder="Password"
            />
            
            <div className="flex items-center justify-between">
              <button 
                type="submit" 
                className="px-4 py-3 rounded-md bg-[#2d2b2b] text-[#d6b692] font-semibold hover:bg-[#3c3a3a] focus:outline-none focus:ring-2 focus:ring-[#b89c7d]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Login;