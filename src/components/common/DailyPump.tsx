import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { DrawerClose, DrawerContent, DrawerTitle } from "../ui/drawer";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { displayNumbers } from "@/lib/utils";
import DropIcon from "@/assets/svg/dropIcon.svg?react";
import PumpIcon from "@/assets/svg/pumpIcon.svg";
import { Toast } from "@/lib/toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { balanceAtom, confettiAtom } from "@/lib/atom";

const dropsDays = [
  500, 1000, 2500, 5000, 15000, 25000, 100000, 500000, 1000000, 5000000,
];


const DailyPump = (
  
) => {
  const [currentDay, setCurrentDay] = useState(0);
  const [totalDrops, setTotalDrops] = useState(0);
  const [collected, setCollected] = useState(Array(10).fill(false));
  const [lastPumpTime, setLastPumpTime] = useState<Date | null>(null);
  const [isPumpAvailable, setIsPumpAvailable] = useState(true);
  const [, setShowConfetti] = useRecoilState(confettiAtom)

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

  const setBalance = useSetRecoilState(balanceAtom);

  const handlePump = () => {
    if (collected[currentDay] || !isPumpAvailable) return;

    const newTotalDrops = totalDrops + dropsDays[currentDay];
    const newCollected = [...collected];
    newCollected[currentDay] = true;

    Toast(`You've received +${dropsDays[currentDay]} DROPS`, "info");
    setBalance((prev) => {
      const newBalance = prev + dropsDays[currentDay];
      localStorage.setItem("balance", newBalance.toString());
      return newBalance;
    });
    setTotalDrops(newTotalDrops);
    setCollected(newCollected);
    setLastPumpTime(new Date());
    setShowConfetti(true);

    if (currentDay === 9) {
      setCurrentDay(0);
      setCollected(Array(10).fill(false));
    } else {
      setCurrentDay(currentDay + 1);
    }
  };
  return (
    <DrawerContent className="flex flex-col items-center pt-6 pb-3">
      <DrawerTitle className="flex items-center justify-between w-full mr-5">
        <div style={{ width: "40px" }}></div>
        <div className="font-extrabold text-[24px] leading-6">Pump DROPS</div>
        <DrawerClose>
          <IoCloseCircleSharp color="#FFFFFF80" size={25} />
        </DrawerClose>
      </DrawerTitle>
      <div>
        <img src={PumpIcon} alt="pump icon" className="w-[100px] mb-2" />
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
                ? "bg-[#20C962]/50 border-2 border-[#20C962] hover:bg-[#38c76f]"
                : "bg-[#C3C3C33D] border-2 border-transparent hover:bg-[#f7eded3d]"
            }`}
          >
            <div>Day {index + 1}</div>
            <DropIcon className="my-1 h-6 w-6" />
            <div>{displayNumbers(drops)}</div>
          </Button>
        ))}
      </div>
      <div className="w-full px-4 mt-4">
        {isPumpAvailable ? (
          <Button
            onClick={() => {
              handlePump();
            }}
            disabled={!isPumpAvailable}
            className="bg-[#9712F4] font-bold h-12 w-full text-[16px] rounded-full"
          >
            Pump
          </Button>
        ) : (
          <DrawerClose asChild>
            <Button className="bg-[#402F4D] font-bold h-12 w-full text-[16px] text-white rounded-full">
              Come Back Tomorrow
            </Button>
          </DrawerClose>
        )}
      </div>
      <Toaster position="bottom-center" />
    </DrawerContent>
  );
};

export default DailyPump;
