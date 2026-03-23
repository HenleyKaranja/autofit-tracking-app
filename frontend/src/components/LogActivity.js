import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogActivity = () => {
  const [activityType, setActivityType] = useState('running');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Token ${token}` } };
    await axios.post('http://localhost:8000/api/activities/activities/', {
      activity_type: activityType,
      duration: parseInt(duration),
      distance: parseFloat(distance) || null,
    }, config);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Log Activity</h2>
      <form onSubmit={handleSubmit}>
        <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
          <option value="running">Running</option>
          <option value="walking">Walking</option>
          <option value="cycling">Cycling</option>
          <option value="swimming">Swimming</option>
          <option value="strength">Strength Training</option>
          <option value="yoga">Yoga</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Duration (min)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="Distance (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <button type="submit">Log Activity</button>
      </form>
    </div>
  );
};

export default LogActivity;