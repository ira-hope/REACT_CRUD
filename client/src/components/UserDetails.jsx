import React, { useState } from 'react';


const UserDetails = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    position: '',
    company: '',
    businessArena: '',
    employees: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Form data to be submitted:', formData);
    fetch('http://localhost:3006/api/user-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to register user: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        // Optionally handle success response (e.g., show confirmation message)
      })
      .catch((error) => {
        console.error('Error:', error);
        // Optionally handle error (e.g., show error message to user)
      });
  };

  return (
    
      <div className="general-info">
        <h2>General Information</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <select id="title" name="title" value={formData.title} onChange={handleChange} className="help">
              <option value="">Select Title</option>
              <option value="mrs">Mrs.</option>
              <option value="mr">Mr.</option>
              <option value="dr">Dr.</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <select id="position" name="position" value={formData.position} onChange={handleChange} className="help">
              <option value="">Select Position</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
              <option value="consultant">Consultant</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="business-arena">Business Arena</label>
            <select id="business-arena" name="businessArena" value={formData.businessArena} onChange={handleChange} className="help">
              <option value="">Select Business Arena</option>
              <option value="agriculture">Agriculture</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="employees">Employees</label>
            <select id="employees" name="employees" value={formData.employees} onChange={handleChange} className="help">
              <option value="">Select Employees</option>
              <option value="1-20">1-20</option>
              <option value="21-60">21-60</option>
              <option value="61-100">61-100</option>
              <option value="100+">100+</option>
            </select>
          </div>
          <button type="submit" className="register-button">Register as user</button>
        </form>
      </div>
   
  );
};

export default UserDetails;
