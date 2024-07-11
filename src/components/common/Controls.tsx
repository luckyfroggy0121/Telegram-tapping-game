import BoostIcon from "@/assets/svg/boost.svg?react";
import EarnIcon from "@/assets/svg/earn.svg?react";
import FriendsIcon from "@/assets/svg/friends.svg?react";
import PumpIcon from "@/assets/svg/pump.svg?react";
import { Button } from "@/components/ui/button";
import DailyPump from "./DailyPump";
import { useRecoilState } from "recoil";
import { tabsAtom } from "@/lib/atom";
import { Drawer } from "../ui/drawer";
import { useState } from "react";

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

const Controls = () => {
  const [tabs, setTabs] = useRecoilState(tabsAtom);
  const [dailPumpOpen, setDailyPumpOpen] = useState(false);
  const handleControl = (label: string) => {
    if (label !== "Pump") setTabs([...tabs, label.toLowerCase()]);
    else setDailyPumpOpen(true);
  };

  return (
    <div className="flex gap-3 justify-center w-full mb-[52px]">
      <Drawer onOpenChange={setDailyPumpOpen} open={dailPumpOpen}>
        <DailyPump />
      </Drawer>
      {bottomControls.map((control, index) => {
        return (
          <Button
            key={index}
            onClick={() => handleControl(control.label)}
            className=" relative flex flex-col items-center h-[60px] mt-5 w-[70px] gap-1 bg-[#C3C3C340]"
          >
            <control.icon height={24} />
            <div className="font-bold">{control.label}</div>
          </Button>
        );
      })}
    </div>
  );
};

export default Controls;
