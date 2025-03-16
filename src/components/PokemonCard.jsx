import { useNavigate } from "react-router";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const PokemonCard = ({ id, name, url }) => {
  const navigate = useNavigate();

  const onView = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className="relative bg-[#282828] text-[#F5F5F5] rounded-xl p-6 border flex flex-col gap-8">
      <div className="w-1/2">
        <img src={url} className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 p-6 flex flex-col">
        <h3 className="text-xl text-orange-400 font-bold leading-tight mt-2">
          {name}
        </h3>
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <button
            className="text-yellow-500 hover:text-yellow-700"
            onClick={() => onView}
          >
            <FaRegEye size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
