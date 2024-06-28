import { FaArrowLeft } from "react-icons/fa6";
import { CgMoreVertical } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="w-full justify-between flex items-center py-4 px-4">
      <div className="rounded-xl border-[3.5px] p-1 border-[#C3C3C340]">
        <FaArrowLeft color="white" />
      </div>
      <div className="uppercase text-white font-Distruction font-bold text-xl">SmartLitre</div>
      <CgMoreVertical color="white" />
    </div>
  );
};

export default Navbar;
