import PumpIcon from "@/assets/svg/pump.svg?react";
import FriendsIcon from "@/assets/svg/friends.svg?react";
import EarnIcon from "@/assets/svg/earn.svg?react";
import BoostIcon from "@/assets/svg/boost.svg?react";
import { Button } from "@/components/ui/button";

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
  const handlePumping = () => {
    
  };
  return (
    <div className="flex gap-3 justify-center w-full">
      {bottomControls.map((control, index) => (
        <Button
          key={index}
          onClick={control.label === "Pump" ? handlePumping : undefined}
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
