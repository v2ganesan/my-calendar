import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserSetUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, name } = location.state || {};

  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
    purpose: '',
    meeting_avail: {
      start: '',
      end: ''
    },
    meeting_duration: '01:00:00', // Default 1 hour in interval format
    meeting_location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the meeting_avail as a PostgreSQL tsrange
      const formattedData = {
        ...formData,
        meeting_avail: `[${formData.meeting_avail.start},${formData.meeting_avail.end}]`
      };

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

        <div className="form-group">
          <label>Meeting Availability:</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="datetime-local"
              value={formData.meeting_avail.start}
              onChange={(e) => setFormData({
                ...formData,
                meeting_avail: {
                  ...formData.meeting_avail,
                  start: e.target.value
                }
              })}
              required
            />
            <span>to</span>
            <input
              type="datetime-local"
              value={formData.meeting_avail.end}
              onChange={(e) => setFormData({
                ...formData,
                meeting_avail: {
                  ...formData.meeting_avail,
                  end: e.target.value
                }
              })}
              required
            />
          </div>
        </div>

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

        <button type="submit" style={{ marginTop: '20px' }}>
          Save Profile
        </button>
      </form>
    </div>
  );
} 