
import React from "react";

const HealthBar = ({ currentHp, maxHp }) => {
  const healthPercentage = (currentHp / maxHp) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full h-4">
      <div
        className={`h-4 rounded-full ${
          healthPercentage > 50
            ? "bg-green-500"
            : healthPercentage > 25
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{ width: `${healthPercentage}%` }}
      ></div>
    </div>
  );
};

export default HealthBar;
