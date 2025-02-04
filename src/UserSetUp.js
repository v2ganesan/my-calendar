import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserSetUp() {
  const navigate = useNavigate();
  //const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const name = queryParams.get("name");

  //const picture = queryParams.get("picture");
  //const email = localStorage.getItem("email");
  //const name = localStorage.getItem("name");

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
    purpose: '',
    availability: daysOfWeek.reduce((acc, day) => {
        acc[day] = { start_time: '', end_time: '', isAvailable: true};
        return acc;
      }, {}), 
    meeting_duration: '01:00:00', // Default 1 hour in interval format
    meeting_location: '',
  });

  const handleTimeChange = (day, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      availability: {
        ...prevData.availability,
        [day]: {
          ...prevData.availability[day],
          [key]: value,
        },
      },
    }));
  };

  const handleAvailabilityToggle = (day) => {
    setFormData((prevData) => ({
      ...prevData,
      availability: {
        ...prevData.availability,
        [day]: {
          ...prevData.availability[day],
          isAvailable: !prevData.availability[day].isAvailable,
        },
      },
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit triggered")
    try {
        // Prepare the data for submission
        const formattedData = {
          ...formData,
    };
    console.log('Submitting data:', formattedData);

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        navigate('/success');
      } else {
        throw new Error('Failed to save user data');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({
              ...formData,
              name: e.target.value
            })}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({
              ...formData,
              email: e.target.value
            })}
            required
          />
        </div>

        <div className="form-group">
          <label>Purpose:</label>
          <select
            value={formData.purpose}
            onChange={(e) => setFormData({
              ...formData,
              purpose: e.target.value
            })}
            required
          >
            <option value="">Select a purpose</option>
            <option value="Academic">Academic</option>
            <option value="Professional">Professional</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>


        <h3>Weekly Availability</h3>
        {daysOfWeek.map((day) => (
          <div key={day} className="form-group">
            <label>{day}:</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {formData.availability[day].isAvailable ? (
                <>
                  <input
                    type="time"
                    value={formData.availability[day].start_time}
                    onChange={(e) => handleTimeChange(day, 'start_time', e.target.value)}
                    required
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={formData.availability[day].end_time}
                    onChange={(e) => handleTimeChange(day, 'end_time', e.target.value)}
                    required
                  />
                </>
              ) : (
                <span style={{ fontStyle: 'italic', color: 'gray' }}>Unavailable</span>
              )}
              <button
                type="button"
                onClick={() => handleAvailabilityToggle(day)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                {formData.availability[day].isAvailable ? 'X' : '+'}
              </button>
            </div>
          </div>
        ))}

        <div className="form-group">
          <label>Meeting Duration:</label>
          <select
            value={formData.meeting_duration}
            onChange={(e) => setFormData({
              ...formData,
              meeting_duration: e.target.value
            })}
            required
          >
            <option value="00:30:00">30 minutes</option>
            <option value="01:00:00">1 hour</option>
            <option value="01:30:00">1.5 hours</option>
            <option value="02:00:00">2 hours</option>
          </select>
        </div>

        <div className="form-group">
          <label>Meeting Location:</label>
          <input
            type="text"
            value={formData.meeting_location}
            onChange={(e) => setFormData({
              ...formData,
              meeting_location: e.target.value
            })}
            placeholder="Enter meeting location"
            required
          />
        </div>

        <button type="submit"   
                onClick={() => console.log("Submit button clicked")}
                style={{ marginTop: '20px' }}>
          Save Profile
        </button>
      </form>
    </div>
  );
} 