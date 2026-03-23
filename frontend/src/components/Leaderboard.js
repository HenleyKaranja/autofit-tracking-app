import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };
      const res = await axios.get('http://localhost:8000/api/leaderboard/', config);
      setLeaderboard(res.data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, idx) => (
          <li key={idx}>{user.username} - {user.total_points} points</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;