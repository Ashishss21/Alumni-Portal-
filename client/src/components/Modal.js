// src/components/Modal.js

import React, { useState } from 'react';

const Modal = ({ closeModal, handleAddDetails }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    graduationYear: '',
    university: '',
    degree: '',
    contactDetails: { phone: '', address: '' },
    employmentHistory: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleEmploymentChange = (index, e) => {
    const { name, value } = e.target;
    const newEmploymentHistory = [...newProfile.employmentHistory];
    newEmploymentHistory[index] = { ...newEmploymentHistory[index], [name]: value };
    setNewProfile({ ...newProfile, employmentHistory: newEmploymentHistory });
  };

  const addEmploymentHistory = () => {
    setNewProfile({ ...newProfile, employmentHistory: [...newProfile.employmentHistory, {}] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddDetails(newProfile);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Add Profile Details</h2>
        <div className="max-h-96 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={newProfile.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Graduation Year:</label>
              <input
                type="text"
                name="graduationYear"
                value={newProfile.graduationYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">University:</label>
              <input
                type="text"
                name="university"
                value={newProfile.university}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Degree:</label>
              <input
                type="text"
                name="degree"
                value={newProfile.degree}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone:</label>
              <input
                type="text"
                name="contactDetails.phone"
                value={newProfile.contactDetails.phone}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, contactDetails: { ...newProfile.contactDetails, phone: e.target.value } })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Address:</label>
              <input
                type="text"
                name="contactDetails.address"
                value={newProfile.contactDetails.address}
                onChange={(e) =>
                  setNewProfile({
                    ...newProfile,
                    contactDetails: { ...newProfile.contactDetails, address: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Employment History:</label>
              {newProfile.employmentHistory.map((job, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    value={job.company || ''}
                    onChange={(e) => handleEmploymentChange(index, e)}
                    className="w-full px-3 py-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    name="role"
                    value={job.role || ''}
                    onChange={(e) => handleEmploymentChange(index, e)}
                    className="w-full px-3 py-2 border rounded mb-2"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    value={job.startDate || ''}
                    onChange={(e) => handleEmploymentChange(index, e)}
                    className="w-full px-3 py-2 border rounded mb-2"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    value={job.endDate || ''}
                    onChange={(e) => handleEmploymentChange(index, e)}
                    className="w-full px-3 py-2 border rounded mb-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addEmploymentHistory}
                className="mt-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Add Employment
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
