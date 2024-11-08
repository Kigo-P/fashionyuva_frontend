import React, { useState } from 'react';
import Header from 'Header.jsx'
import Footer from 'Footer.jsx'
import 'index.css'

const AddUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    role: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.phoneNumber || !user.role) {
      setError("Please fill out all fields.");
      return;
    }
    console.log("User Data Submitted:", user);
    // Add your API call or data processing logic here
    setError(''); 
  };

  return (
    <div className="add-user-page">
      <Header />
      <div className="add-user-container">
        <h2 className="add-user-title">Add New User</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="add-user-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
          <label>
            Role:
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <button type="submit" className="submit-button">Add User</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddUser;
