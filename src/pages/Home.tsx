import { seaCreatures } from "@/lib/seacreatures";
import { Button } from "@/components/ui/button";
import PumpIcon from "@/assets/svg/pump.svg?react";
import FriendsIcon from "@/assets/svg/friends.svg?react";
import EarnIcon from "@/assets/svg/earn.svg?react";
import BoostIcon from "@/assets/svg/boost.svg?react";
import Diamod from "@/assets/images/diamond.png";
import Lightning from "@/assets/images/lightning.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { displayNumbers } from "@/lib/utils";

const bottomControls = [
  {
    label: "Pump",
    icon: PumpIcon,
  },
  {
    label: "Friends",
    icon: FriendsIcon,
  },
  {
    label: "Earn",
    icon: EarnIcon,
  },
  {
    label: "Boost",
    icon: BoostIcon,
  },
];

const HomePage = () => {
  const random = Math.floor(Math.random() * seaCreatures.length);
  const { Medal, diamonds, title, image } = seaCreatures[random];

  return (
    <>
      <div className="flex  flex-col items-center pt-2">
        <Button
          className="w-[198px] bg-[#AD12F5C2] h-[44px] font-bold text-[16px] leading-5 rounded-[30px]"
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          Join Tank
        </Button>
        <div className="flex mt-3 items-center gap-2 font-extrabold text-[36px] text-white">
          <img src={Diamod} alt="diamond" className="h-9" />
          <div>{displayNumbers(diamonds)}</div>
        </div>
        <Button className="bg-[#C3C3C340] mt-2 gap-2 font-bold text-[15px] w-auto px-6 py-1 justify-center h-auto text-white flex rounded-[11px] items-center">
          <div>{title}</div>
          {Medal && <Medal className="h-5 w-5" />}
        </Button>
        <div className="w-full px-5 mt-5">
          <div className="flex justify-between text-white font-bold">
            <div className="text-[11px]">Hydration Goal</div>
            <div className="text-[10px]">Level {random}/6</div>
          </div>
          <ProgressBar
            completed={0}
            bgColor="#65E4F0"
            height="5px"
            className="mt-1 mb-2"
            isLabelVisible={false}
            borderRadius="10px"
            baseBgColor="#C3C3C340"
          />
          <div className="items-center mt-2 flex gap-2">
            <img src={Lightning} alt="lightning" />
            <div className="text-white font-extrabold text-[10px]">500/500</div>
          </div>
        </div>
        <div className="h-[15rem]"></div>
      </div>
      <div className="flex mt-3 gap-3 justify-center w-full">
        {bottomControls.map((control, index) => (
          <Button
            key={index}
            className="flex flex-col items-center h-[60px] mt-5 w-[70px] gap-1 bg-[#C3C3C340]"
          >
            <control.icon height={24} />
            <div>{control.label}</div>
          </Button>
        ))}
      </div>
    </>
  );
};

export default HomePage;
