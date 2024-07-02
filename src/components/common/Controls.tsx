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
const Controls = () => {
  const [showPumpDrawer, setShowPumpDrawer] = useState(false);

  const handleControl = (label: string) => {
    if (label === "Pump") {
      setShowPumpDrawer(true);
    }
  };

  return (
    <div className="flex gap-3 justify-center w-full">
      <Drawer open={showPumpDrawer} onOpenChange={setShowPumpDrawer}>
        <DrawerTrigger asChild>
          <Button className="flex flex-col items-center h-[60px] mt-5 w-[70px] gap-1 text-white rounded-md  bg-[#C3C3C340]">
            <PumpIcon height={24} />
            <div>Pump</div>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="pt-6 flex flex-col items-center pb-5">
          <DrawerTitle className="flex items-center w-full justify-between mr-5">
            <div></div>
            <div className="font-extrabold text-[24px] text-white leading-6">
              Pump DROPS
            </div>
            <DrawerClose>
              <IoCloseCircleSharp color="#FFFFFF80" size={25} />
            </DrawerClose>
          </DrawerTitle>
          <PumpIcon />
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
