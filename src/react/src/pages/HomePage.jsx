import { React, useEffect, useState } from "react";
import "./HomePage.scss";
import { TeamTile } from "../components/TeamTile";
import axios from "axios";

export const HomePage = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT_URL}/team`
        );

        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    fetchAllTeams();
  }, []);

  return (
    <div className="HomePage">
      <div className="header-section">
        <center>
          <h1 className="app-name">IPL Dashboard</h1>
        </center>
      </div>
      <div className="team-grid">
        {teams.map((team) => (
          <TeamTile key={team.id} teamName={team.teamName} />
        ))}
      </div>
    </div>
  );
};
