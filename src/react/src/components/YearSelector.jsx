import React from "react";
import { Link } from "react-router-dom";
import "./YearSelector.scss";

export const YearSelector = ({ teamName }) => {
  let years = [];
  const startYear = Number(import.meta.env.VITE_APP_DATA_START_YEAR);
  const endYear = Number(import.meta.env.VITE_APP_DATA_END_YEAR);

  console.log(startYear, endYear);
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }
  return (
    <ol className="YearSelector">
      {years.map((year) => (
        <li key={year}>
          <Link to={`/teams/${teamName}/matches/${year}`}>{year}</Link>
        </li>
      ))}
    </ol>
  );
};
