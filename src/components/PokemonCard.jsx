import { useNavigate } from "react-router";
import { FaRegEye, FaShieldAlt } from "react-icons/fa";
import {
  GiBroadsword,
  GiShield,
  GiHeartPlus,
  GiShieldBash,
} from "react-icons/gi";

const PokemonCard = ({ id, name, url, stats }) => {
  const navigate = useNavigate();

  const onView = () => {
    console.log("View-->pokemon id:", id);
    navigate(`/pokemon/${id}`);
  };

  const getStatDetails = (name) => {
    switch (name) {
      case "attack":
        return {
          color: "bg-green-500",
          icon: <GiBroadsword size={22} className="text-green-400" />,
          label: "Attack",
        };
      case "defense":
        return {
          color: "bg-blue-500",
          //this icon looks so small. Changes of sizes and shield type had no effect
          icon: (
            <GiShieldBash
              style={{ width: 24, height: 24 }}
              className="text-blue-400"
            />
          ),
          label: "Defense",
        };
      case "hp":
        return {
          color: "bg-red-500",
          icon: <GiHeartPlus size={22} className="text-red-400" />,
          label: "Health",
        };
      default:
        return {
          color: "bg-yellow-400",
          icon: null,
          label: name.toUpperCase(),
        };
    }
  };

  return (
    <div className="relative bg-[#282828] text-[#F5F5F5] rounded-xl p-6 border flex flex-col gap-4">
      <div className="w-1/2">
        <img src={url} className="w-full h-full object-cover" alt={name} />
      </div>

      <div className="w-1/2 p-6 flex flex-col">
        <h3 className="text-xl text-orange-400 font-bold leading-tight mt-2">
          {name}
        </h3>

        <div className="mt-2 space-y-2">
          {stats.map((stat) => {
            const { color, icon, label } = getStatDetails(stat.name);

            return (
              <div key={stat.name} className="flex items-center gap-2">
                <span className="text-sm font-semibold w-16 flex items-center gap-1">
                  {icon} {label}
                </span>
                <div className="w-full h-3 bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    className={`h-full rounded-lg ${color}`}
                    style={{ width: `${(stat.value / 150) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{stat.value}</span>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <button
            className="text-yellow-500 hover:text-yellow-700"
            onClick={onView}
          >
            <FaRegEye size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
