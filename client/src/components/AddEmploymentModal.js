import React, { useState } from 'react';

const AddEmploymentModal = ({ closeModal, handleAddEmployment }) => {
  const [employmentDetails, setEmploymentDetails] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmploymentDetails({ ...employmentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddEmployment(employmentDetails);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Add Employment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={employmentDetails.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={employmentDetails.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={employmentDetails.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={employmentDetails.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Employment</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmploymentModal;
