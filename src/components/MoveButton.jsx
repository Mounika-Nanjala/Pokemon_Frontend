import React from "react";

const MoveButton = ({ move, handleAttack }) => {
  return (
    <button
      onClick={() => handleAttack(move)}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      {move.name} ({move.damage} DMG)
    </button>
  );
};

export default MoveButton;
