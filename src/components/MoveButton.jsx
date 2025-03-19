import React from "react";
import { Zap, Swords, Flame, Shield, Droplet, Star } from "lucide-react";

const getMoveIcon = (moveName) => {
    switch (moveName.toLowerCase()) {
        case "tackle":
            return <Swords size={16} />;
        case "quick attack":
            return <Zap size={16} />;
        case "slam":
            return <Star size={16} />;
        case "body slam":
            return <Shield size={16} />;
        case "hydro pump":
            return <Droplet size={16} />;
        case "flamethrower":
            return <Flame size={16} />;
        default:
            return null;
    }
};

const MoveButton = ({ move, handleAttack }) => {
    return (
        <button
            onClick={() => handleAttack(move)}
            className="flex items-center justify-center gap-2 px-5 py-3 btn-custom">
            {getMoveIcon(move.name)}
            <span>
                {move.name} ({move.damage} DMG)
            </span>
        </button>
    );
};

export default MoveButton;
