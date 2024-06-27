import React, { useState } from 'react';
import ContactDetailsTable from './table';

const ContactDetails = () => {
  const [formData, setFormData] = useState({
    street: '',
    additionalInfo: '',
    zipCode: '',
    place: '',
    country: '',
    code: '',
    phoneNumber: '',
    email: '',
    termsAndConditions: false,
  });

  const [dataList, setDataList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedDataList = [...dataList];
      updatedDataList[editIndex] = formData;
      setDataList(updatedDataList);
      setEditIndex(null);
    } else {
      setDataList((prevDataList) => [...prevDataList, formData]);
    }

    setFormData({
      street: '',
      additionalInfo: '',
      zipCode: '',
      place: '',
      country: '',
      code: '',
      phoneNumber: '',
      email: '',
      termsAndConditions: false,
    });
  };

  const handleEdit = (index) => {
    setFormData(dataList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDataList = dataList.filter((_, i) => i !== index);
    setDataList(updatedDataList);
  };

  return (
   
   
    <div className="contact-details">
      <h2>Contact Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="street">Street + Nr</label>
          <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="additional-info">Additional Information</label>
          <input type="text" id="additional-info" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="zip-code">Zip Code</label>
          <input type="text" id="zip-code" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
          <br />
          <label htmlFor="place">Place</label>
          <select id="place" name="place" value={formData.place} onChange={handleChange} required>
            <option value="">Select Place</option>
            <option value="Las Vegas">Las Vegas</option>
            <option value="Kigali">Kigali</option>
            <option value="Kampala">Kampala</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select id="country" name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Kenya">Kenya</option>
            <option value="Canada">Canada</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="code">Code +</label>
          <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} required />
          <label htmlFor="phone-number">Phone Number</label>
          <input type="tel" id="phone-number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="checkbox" id="terms-and-conditions" name="termsAndConditions" checked={formData.termsAndConditions} onChange={handleChange} required />
          <label htmlFor="terms-and-conditions">I do accept the Terms and Conditions of your site.</label>
        </div>
        <button type="submit" className="register-button">{editIndex !== null ? 'Update' : 'Register'}</button>
      </form>
      {dataList.length > 0 && (
        <ContactDetailsTable dataList={dataList} handleEdit={handleEdit} handleDelete={handleDelete} />
      )}
    </div>
    
  );
};

  


export default ContactDetails;
