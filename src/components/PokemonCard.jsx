import { useNavigate } from "react-router";
import { FaRegEye } from "react-icons/fa";
import { GiBroadsword, GiShield, GiHeartPlus } from "react-icons/gi";

const PokemonCard = ({ id, name, url, stats }) => {
    const navigate = useNavigate();

    const onView = () => {
        console.log("View --> Pokémon ID:", id);
        navigate(`/pokemon/${id}`);
    };

    const getStatDetails = (statName) => {
        switch (statName) {
            case "attack":
                return {
                    color: "bg-green-500",
                    icon: <GiBroadsword size={20} className="text-green-400" />,
                    label: "Attack",
                };
            case "defense":
                return {
                    color: "bg-blue-500",
                    icon: <GiShield size={20} className="text-blue-400" />,
                    label: "Defense",
                };
            case "hp":
                return {
                    color: "bg-red-500",
                    icon: <GiHeartPlus size={20} className="text-red-400" />,
                    label: "Health",
                };
            default:
                return {
                    color: "bg-gray-400",
                    icon: null,
                    label: statName.toUpperCase(),
                };
        }
    };

    return (
        <div className="relative rounded-xl p-6 border border-gray-600 dark:border-gray-700 flex flex-col items-center gap-4 shadow-md hover:shadow-lg transition-all duration-300">
            {/* Pokémon image */}
            <div className="w-32 h-32 animate-subtleBounce">
                <img
                    src={url}
                    className="w-full h-full object-contain"
                    alt={name}
                />
            </div>

            {/* Pokémon Name */}
            <h3 className="text-lg text-yellow-400 font-bold capitalize">
                {name}
            </h3>

            {/* Stats */}
            <div className="w-full space-y-2">
                {stats.map((stat) => {
                    const { color, icon, label } = getStatDetails(stat.name);

                    return (
                        <div
                            key={stat.name}
                            className="flex items-center gap-2">
                            {/* Icon + Label */}
                            <span className="text-sm font-semibold w-20 flex items-center gap-1">
                                {icon} {label}
                            </span>
                            {/* Progress Bar */}
                            <div className="relative flex-1 h-3 bg-gray-700 rounded-lg overflow-hidden">
                                <div
                                    className={`absolute left-0 h-full rounded-lg ${color} transition-all duration-300`}
                                    style={{
                                        width: `${(stat.value / 150) * 100}%`,
                                    }}></div>
                            </div>
                            {/* Number */}
                            <span className="text-sm font-semibold w-8 text-right">
                                {stat.value}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* View Button  */}
            <button
                className="bg-transparent border border-yellow-500 text-yellow-500 rounded-full p-3 transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                onClick={onView}
                aria-label="View Pokémon">
                <FaRegEye size={22} />
            </button>
        </div>
    );
};

export default PokemonCard;
