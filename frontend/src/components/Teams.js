import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };
      const res = await axios.get('http://localhost:8000/api/teams/teams/', config);
      setTeams(res.data);
    };
    fetchTeams();
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id}>{team.name} - {team.total_points} points</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;