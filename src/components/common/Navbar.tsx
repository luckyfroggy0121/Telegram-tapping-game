import { FaArrowLeft } from "react-icons/fa6";
import { CgMoreVertical } from "react-icons/cg";
import { useSetRecoilState } from "recoil";
import { tabsAtom } from "@/lib/atom";

const Navbar = () => {
  const setTabs = useSetRecoilState(tabsAtom);
  return (
    <div className="w-full justify-between flex items-center py-4 px-4 grow-0 shrink basis-auto">
      <div
        onClick={() => {
            setTabs((tabs) =>
              tabs.length === 1 ? tabs : tabs.slice(0, tabs.length - 1)
            );
        }}
        className="rounded-xl border-[3.5px] p-1 border-[#C3C3C340]"
      >
        <FaArrowLeft color="white" />
      </div>
      <div className="uppercase font-[Distruction] text-xl">
        SmartLitre
      </div>
      <CgMoreVertical color="white" />
    </div>
  );
};

export default Navbar;
