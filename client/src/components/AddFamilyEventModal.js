import React, { useState } from 'react';

const AddFamilyEventModal = ({ closeModal, handleAddFamilyEvent }) => {
  const [familyEventDetails, setFamilyEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamilyEventDetails({ ...familyEventDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddFamilyEvent(familyEventDetails);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Add Family Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={familyEventDetails.eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Event Date:</label>
            <input
              type="date"
              name="eventDate"
              value={familyEventDetails.eventDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="eventDescription"
              value={familyEventDetails.eventDescription}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default AddFamilyEventModal;
