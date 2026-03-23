import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [activities, setActivities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };

      const profileRes = await axios.get('http://localhost:8000/api/activities/profile/', config);
      setProfile(profileRes.data[0] || {});

      const activitiesRes = await axios.get('http://localhost:8000/api/activities/activities/', config);
      setActivities(activitiesRes.data);

      const suggestionsRes = await axios.get('http://localhost:8000/api/suggestions/', config);
      setSuggestions(suggestionsRes.data.suggestions);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Points: {profile.total_points || 0}</p>
      <p>Level: {profile.level || 1}</p>
      <h3>Recent Activities</h3>
      <ul>
        {activities.slice(0, 5).map(activity => (
          <li key={activity.id}>{activity.activity_type} - {activity.duration} min</li>
        ))}
      </ul>
      <h3>Suggestions</h3>
      <ul>
        {suggestions.map((sug, idx) => <li key={idx}>{sug}</li>)}
      </ul>
      <Link to="/log-activity">Log Activity</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/teams">Teams</Link>
    </div>
  );
};

export default Dashboard;