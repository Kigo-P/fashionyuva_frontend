import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = ({ onSubmitSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Pass the formData to the parent component or API for submission
      await onSubmitSignup(formData);
    } catch (err) {
      setError(err.message || 'An error occurred during signup.');
    }
  };

  return (
    <div
      className="flex items-center justify-end min-h-screen bg-cover bg-center"
    //   style={{
    //     backgroundImage: 'url("https://i.pinimg.com/564x/85/81/3a/85813a9b4fc7f99f43263b732d609f6c.jpg")',
    //   }}
    >
      <div
        className="w-full max-w-md p-8 space-y-8 glassmorphism mr-10"
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '15px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-3xl font-semibold text-center text-white">Sign-up Account</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
              required
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
              required
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
              required
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-900 transition-colors duration-300"
          >
            Sign Up
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-white">
              Already have an account?{' '}
              <Link to="/auth" className="text-green-900 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
