import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";

import "./TeamPage.scss";

export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT_URL}/team/${teamName}`
        );
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeam();
  }, [teamName]);

  if (!team || !team.teamName) {
    return <h1>Team not found</h1>;
  }

  const totalMatches = team.totalMatches;
  const totalWins = team.totalWins;
  const totalLosses = totalMatches - totalWins;

  const pieChartData = [
    {
      title: "Losses",
      value: totalLosses,
      color: "#a34d5d",
      percentage: ((totalLosses / totalMatches) * 100).toFixed(2),
    },
    {
      title: "Wins",
      value: totalWins,
      color: "#4da375",
      percentage: ((totalWins / totalMatches) * 100).toFixed(2),
    },
  ];

  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>
      <div className="win-loss-section">
        Wins / Losses
        <PieChart
          className="pie-chart"
          data={pieChartData}
          label={({ dataEntry }) => dataEntry.percentage + "%"}
          labelStyle={{
            fontSize: "10px",
            fontFamily: "sans-serif",
          }}
        />
      </div>
      <div className="match-detail-section">
        <h3>Latest Matches</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      {team.matches.slice(1).map((match) => (
        <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />
      ))}
      <div className="more-link">
        <Link
          to={`/teams/${teamName}/matches/${
            import.meta.env.VITE_APP_DATA_END_YEAR
          }`}
        >
          More {">"}
        </Link>
      </div>
    </div>
  );
};
