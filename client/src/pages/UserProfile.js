import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
// import { useAuth } from '../context/AuthContext';
import AddEmploymentModal from "../components/AddEmploymentModal";
import AddFamilyEventModal from "../components/AddFamilyEventModal";

const Profile = () => {
  // const { authState } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // To track which modal type is open

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/profile", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setProfile(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(
          "Error fetching profile:",
          err.response ? err.response.data : err.message
        );
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put("/api/profile", profile, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setProfile(res.data);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleAddEmployment = async (employmentDetails) => {
    try {
      const res = await axiosInstance.post(
        "/api/profile/addEmployment",
        employmentDetails,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setProfile(res.data);
      setIsModalOpen(false);
      alert("Employment details added successfully");
    } catch (err) {
      console.error(
        "Error adding employment details:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleAddFamilyEvent = async (familyEventDetails) => {
    try {
      const res = await axiosInstance.post(
        "/api/profile/addFamilyEvent",
        familyEventDetails,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setProfile(res.data);
      setIsModalOpen(false);
      alert("Family event added successfully");
    } catch (err) {
      console.error(
        "Error adding family event:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (profile === null) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <p>No profile details found. Please add your details.</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add details
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="mb-4">
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Graduation Year:</label>
            <input
              type="text"
              name="graduationYear"
              value={profile.graduationYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">University:</label>
            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Degree:</label>
            <input
              type="text"
              name="degree"
              value={profile.degree}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Phone:</label>
            <input
              type="text"
              name="contactDetails.phone"
              value={profile.contactDetails.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  contactDetails: {
                    ...profile.contactDetails,
                    phone: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Address:</label>
            <input
              type="text"
              name="contactDetails.address"
              value={profile.contactDetails.address}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  contactDetails: {
                    ...profile.contactDetails,
                    address: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Employment History:</label>
            {profile.employmentHistory.map((job, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={job.company}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      employmentHistory: profile.employmentHistory.map(
                        (job, i) =>
                          i === index
                            ? { ...job, company: e.target.value }
                            : job
                      ),
                    })
                  }
                  className="w-full px-3 py-2 border rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={job.role}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      employmentHistory: profile.employmentHistory.map(
                        (job, i) =>
                          i === index ? { ...job, role: e.target.value } : job
                      ),
                    })
                  }
                  className="w-full px-3 py-2 border rounded mb-2"
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={job.startDate}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      employmentHistory: profile.employmentHistory.map(
                        (job, i) =>
                          i === index
                            ? { ...job, startDate: e.target.value }
                            : job
                      ),
                    })
                  }
                  className="w-full px-3 py-2 border rounded mb-2"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={job.endDate}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      employmentHistory: profile.employmentHistory.map(
                        (job, i) =>
                          i === index
                            ? { ...job, endDate: e.target.value }
                            : job
                      ),
                    })
                  }
                  className="w-full px-3 py-2 border rounded mb-2"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Graduation Year:</strong> {profile.graduationYear}
          </p>
          {/* Display more profile details */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
          <div className="mt-6">
            <button
              onClick={() => openModal("employment")}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-4"
            >
              Add Employment Details
            </button>
            <button
              onClick={() => openModal("familyEvent")}
              className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
            >
              Add Family Event
            </button>
          </div>
        </div>
      )}

      {isModalOpen && modalType === "employment" && (
        <AddEmploymentModal
          closeModal={closeModal}
          handleAddEmployment={handleAddEmployment}
        />
      )}

      {isModalOpen && modalType === "familyEvent" && (
        <AddFamilyEventModal
          closeModal={closeModal}
          handleAddFamilyEvent={handleAddFamilyEvent}
        />
      )}
    </div>
  );
};

export default Profile;
