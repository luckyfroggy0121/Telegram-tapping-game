import Diamond from "@/assets/images/diamond.png";
import BoostIcon from "@/assets/svg/boost.svg?react";
import EarnIcon from "@/assets/svg/earn.svg?react";
import FriendsIcon from "@/assets/svg/friends.svg?react";
import PumpIcon from "@/assets/svg/pump.svg?react";
import { Button } from "@/components/ui/button";

import { tabsAtom } from "@/lib/atom";
import { displayNumbers } from "@/lib/utils";
import { useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import Confetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "../ui/drawer";
import { BsCheckCircleFill } from "react-icons/bs";

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

const dropsDays = [
  500, 1000, 2500, 5000, 15000, 25000, 100000, 500000, 1000000, 5000000,
];

const Controls = () => {
  const [showPumpDrawer, setShowPumpDrawer] = useState(false);
  const [tabs, setTabs] = useRecoilState(tabsAtom);
  const handleControl = (label: string) => {
    if (label === "Earn") {
      setTabs([...tabs, "earn"]);
    }
  };

  const [currentDay, setCurrentDay] = useState(0);
  const [totalDrops, setTotalDrops] = useState(0);
  const [collected, setCollected] = useState(Array(10).fill(false));
  const [lastPumpTime, setLastPumpTime] = useState<Date | null>(null);
  const [isPumpAvailable, setIsPumpAvailable] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // pumping functionality

  useEffect(() => {
    // Load streak data from localStorage
    // localStorage.clear();
    const savedDay = Number(localStorage.getItem("currentDay") || 0);
    const savedDrops = Number(localStorage.getItem("totalDrops") || 0);
    const savedCollected = JSON.parse(
      localStorage.getItem("collected") || "[]"
    );
    const savedLastPumpTime = localStorage.getItem("lastPumpTime");

    setCurrentDay(savedDay);
    setTotalDrops(savedDrops);
    setCollected(
      savedCollected.length ? savedCollected : Array(10).fill(false)
    );
    if (savedLastPumpTime) {
      setLastPumpTime(new Date(savedLastPumpTime));
    }
  }, []);

  useEffect(() => {
    // Save streak data to localStorage
    localStorage.setItem("currentDay", currentDay.toString());
    localStorage.setItem("totalDrops", totalDrops.toString());
    localStorage.setItem("collected", JSON.stringify(collected));
    if (lastPumpTime) {
      localStorage.setItem("lastPumpTime", lastPumpTime.toISOString());
    }
  }, [currentDay, totalDrops, collected, lastPumpTime]);

  useEffect(() => {
    if (lastPumpTime) {
      const now = new Date();
      const timeDiff = now.getTime() - lastPumpTime.getTime();
      const hoursPassed = timeDiff / (1000 * 60 * 60);
      setIsPumpAvailable(hoursPassed >= 24);
    } else {
      setIsPumpAvailable(true);
    }
  }, [lastPumpTime]);

  const handlePump = () => {
    if (collected[currentDay] || !isPumpAvailable) return;

    const newTotalDrops = totalDrops + dropsDays[currentDay];
    const newCollected = [...collected];
    newCollected[currentDay] = true;

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } flex items-center justify-start gap-2 w-full bg-[#6a1fc9] rounded-full py-3 px-3`}
      >
        <BsCheckCircleFill size={25} />
        <h3 className="text-sm font-bold text-white">
          You've received +{dropsDays[currentDay]} DROPS
        </h3>
      </div>
    ));
    setTotalDrops(newTotalDrops);
    setCollected(newCollected);
    setLastPumpTime(new Date());
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    if (currentDay === 9) {
      setCurrentDay(0);
      setCollected(Array(10).fill(false));
    } else {
      setCurrentDay(currentDay + 1);
    }
  };
  return (
    <div className="flex gap-3 justify-center w-full mb-[52px]">
      <Drawer open={showPumpDrawer} onOpenChange={setShowPumpDrawer}>
        <DrawerContent className="pt-6 flex flex-col items-center pb-3">
          {showConfetti && (
            <Confetti numberOfPieces={1500} recycle={false} gravity={0.09} />
          )}
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
                className={`font-extrabold text-[12px] leading-[18px] flex flex-col h-auto  ${
                  collected[index]
                    ? "bg-[#20C962] border-2 border-[#20C962] hover:bg-[#38c76f]"
                    : "bg-[#C3C3C33D] border-2 border-transparent hover:bg-[#f7eded3d]"
                } ${
                  currentDay === index
                    ? "border border-[#20C962]"
                    : "border border-transparent"
                }`}
              >
                <div>Day {index + 1}</div>
                <img src={Diamond} alt="diamond" />
                <div>{displayNumbers(drops)}</div>
              </Button>
            ))}
          </div>
          <div className="px-4  w-full mt-4">
            {isPumpAvailable ? (
              <Button
                onClick={handlePump}
                disabled={!isPumpAvailable}
                className="bg-[#9712F4] font-bold h-12 w-full text-[16px] rounded-full"
              >
                Pump
              </Button>
            ) : (
              <DrawerClose asChild>
                <Button className="bg-[#402F4D] font-bold h-12 w-full text-[16px] text-white rounded-full">
                  Come Back Tommorrow
                </Button>
              </DrawerClose>
            )}
          </div>
          <Toaster position="bottom-center" />
        </DrawerContent>
      </Drawer>
      {bottomControls.map((control, index) => (
        <Button
          key={index}
          onClick={() => handleControl(control.label)}
          className=" relative flex flex-col items-center h-[60px] mt-5 w-[70px] gap-1 bg-[#C3C3C340]"
        >
          <control.icon height={24} />
          <div className="font-bold">{control.label}</div>
          {control.label !== "Earn" && (
            <div className="absolute -top-3 right-0 px-3 bg-[#bd5ef8] text-white font-bold rounded-full ">
              <p>soon</p>
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};

export default Controls;
