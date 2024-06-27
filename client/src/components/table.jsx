import React from 'react';

const ContactDetailsTable = ({ dataList, handleEdit, handleDelete }) => {
  return (
    <div className="contact-details-table">
      <h2>Contact Details</h2>
      {dataList.length > 0 ? (
        <table className="contact-table">
          <thead>
            <tr>
              <th>Street + Nr</th>
              <th>Additional Information</th>
              <th>Zip Code</th>
              <th>Place</th>
              <th>Country</th>
              <th>Code +</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)} className="delete">
                    Delete
                  </button>
                </td>
                <td>{data.street}</td>
                <td>{data.additionalInfo}</td>
                <td>{data.zipCode}</td>
                <td>{data.place}</td>
                <td>{data.country}</td>
                <td>{data.code}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.email}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contact details available</p>
      )}
    </div>
  );
};

export default ContactDetailsTable;
