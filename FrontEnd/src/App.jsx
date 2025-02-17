import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp'; // Adjust the path to your file
import Login from './components/Login'; // Adjust the path to your file
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Signup */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Redirect from / to /signup */}
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}
export default App;