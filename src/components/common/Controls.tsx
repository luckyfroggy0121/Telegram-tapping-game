import PumpIcon from "@/assets/svg/pump.svg?react";
import FriendsIcon from "@/assets/svg/friends.svg?react";
import EarnIcon from "@/assets/svg/earn.svg?react";
import BoostIcon from "@/assets/svg/boost.svg?react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Diamond from "@/assets/images/diamond.png";
import { displayNumbers } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { tabsAtom } from "@/lib/atom";

const bottomControls = [
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

const dropsDays = [
  500, 1000, 2500, 5000, 15000, 25000, 100000, 500000, 1000000, 5000000,
];

const Controls = () => {
  const [showPumpDrawer, setShowPumpDrawer] = useState(false);
  const [tabs, setTabs] = useRecoilState(tabsAtom)
  const handleControl = (label: string) => {
    if (label === "Pump") {
      setShowPumpDrawer(true);
    } else if (label === "Friends") {
      setTabs([...tabs, "friends"]);
    }
  };

  return (
    <div className="flex gap-3 justify-center w-full">
      <Drawer open={showPumpDrawer} onOpenChange={setShowPumpDrawer}>
        <DrawerTrigger asChild>
          <Button className="flex flex-col items-center h-[60px] mt-5 w-[70px] gap-1 rounded-md  bg-[#C3C3C340]">
            <PumpIcon height={24} />
            <div>Pump</div>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="pt-6 flex flex-col items-center pb-3">
          <DrawerTitle className="flex items-center w-full justify-between mr-5">
            <div></div>
            <div className="font-extrabold text-[24px] leading-6">
              Pump DROPS
            </div>
            <DrawerClose>
              <IoCloseCircleSharp color="#FFFFFF80" size={25} />
            </DrawerClose>
          </DrawerTitle>
          <div>
            <PumpIcon
              height={100}
              width={100}
              className="[transform:rotateY(180deg)]"
            />
            <img src={Diamond} alt="diamond" />
          </div>
          <div className="font-semibold text-[16px]">
            Pump DROPS daily without skipping.
          </div>
          <div className="grid grid-cols-4 gap-2 px-4 mt-5">
            {dropsDays.map((drops, index) => (
              <Button
                key={index}
                className="font-extrabold text-[12px] leading-[18px] flex flex-col h-auto bg-[#C3C3C33D]"
              >
                <div>Day {index + 1}</div>
                <img src={Diamond} alt="diamond" />
                <div>{displayNumbers(drops)}</div>
              </Button>
            ))}
          </div>
          <div className='px-4  w-full mt-4'>
            <Button className="bg-[#9712F4] font-bold h-12 w-full text-[16px] rounded-full">
              Pump
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
      {bottomControls.map((control, index) => (
        <Button
          key={index}
          onClick={() => handleControl(control.label)}
          className="flex flex-col items-center h-[60px] mt-5 w-[70px] gap-1 bg-[#C3C3C340]"
        >
          <control.icon height={24} />
          <div>{control.label}</div>
        </Button>
      ))}
    </div>
  );
};

export default Controls;
