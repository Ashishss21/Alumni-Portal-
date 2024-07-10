import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const CommunityPage = () => {
  const { authState } = useAuth();
  const [employments, setEmployments] = useState([]);
  const [familyEvents, setFamilyEvents] = useState([]);
  const [sortByCity, setSortByCity] = useState(false);
  const [sortByOrganization, setSortByOrganization] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employmentResponse = await axiosInstance.get('/api/employment');
        const familyEventResponse = await axiosInstance.get('/api/family-event');
        setEmployments(employmentResponse.data);
        setFamilyEvents(familyEventResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSortByCity = () => {
    setSortByCity(true);
    setSortByOrganization(false); // Reset organization sorting
  };

  const handleSortByOrganization = () => {
    setSortByOrganization(true);
    setSortByCity(false); // Reset city sorting
  };

  const sortedEmployments = sortByCity
    ? employments.sort((a, b) => (a.city > b.city ? 1 : -1))
    : sortByOrganization
    ? employments.sort((a, b) => (a.organization > b.organization ? 1 : -1))
    : employments;

  const sortedFamilyEvents = sortByCity
    ? familyEvents.sort((a, b) => (a.city > b.city ? 1 : -1))
    : sortByOrganization
    ? familyEvents.sort((a, b) => (a.organization > b.organization ? 1 : -1))
    : familyEvents;

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Community Page</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={handleSortByCity}
          className={`px-4 py-2 rounded ${sortByCity ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Sort by City
        </button>
        <button
          onClick={handleSortByOrganization}
          className={`px-4 py-2 rounded ${sortByOrganization ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Sort by Organization
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Employments</h2>
          {sortedEmployments.map((employment) => (
            <div key={employment.id} className="bg-white rounded p-4 shadow-md mb-4">
              <p><strong>City:</strong> {employment.city}</p>
              <p><strong>Organization:</strong> {employment.organization}</p>
              <p><strong>Role:</strong> {employment.role}</p>
              {/* Add more employment details */}
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Family Events</h2>
          {sortedFamilyEvents.map((event) => (
            <div key={event.id} className="bg-white rounded p-4 shadow-md mb-4">
              <p><strong>City:</strong> {event.city}</p>
              <p><strong>Organization:</strong> {event.organization}</p>
              <p><strong>Name:</strong> {event.name}</p>
              {/* Add more family event details */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
