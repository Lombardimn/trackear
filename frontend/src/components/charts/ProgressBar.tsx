"use client"

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressBar({percentage}: {percentage: number}) {
  return (
    <div className="flex justify-center p-4 bg-neutral-50 rounded-2xl shadow-md">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}% Consumido`}
        styles={buildStyles({
          pathColor: percentage >= 75 ? "#DC2626" : "#EA580C",
          trailColor: "#4ADE80",
          textColor: percentage >= 75 ? "#DC2626" : "#1D4ED8",
          textSize: 8,
        })}
      />
    </div>
  )
}