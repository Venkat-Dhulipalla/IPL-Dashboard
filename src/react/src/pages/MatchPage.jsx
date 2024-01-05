import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import axios from "axios";
import { YearSelector } from "../components/YearSelector";

import "./MatchPage.scss";

export const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams();
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Make a GET request using Axios
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT_URL}/team/${teamName}/matches`,
          {
            params: { year: year },
          }
        );

        // Set the matches data in the state
        setMatches(response.data);
      } catch (error) {
        // Handle errors
        console.error("Error fetching matches data:", error);
      }
    };

    // Call the fetch matches function
    fetchMatches();
  }, [teamName, year]);

  return (
    <div className="MatchPage">
      <div className="year-selector">
        <h3> Select Year </h3>
        <YearSelector teamName={teamName} />
      </div>
      <div>
        <h1 className="page-heading">
          {teamName} matches in {year}
        </h1>
        {matches.map((match) => (
          <MatchDetailCard key={match.id} teamName={teamName} match={match} />
        ))}
      </div>
    </div>
  );
};
