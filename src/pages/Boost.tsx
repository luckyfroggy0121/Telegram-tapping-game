import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  balanceAtom,
  confettiAtom,
  energyAtom,
  levelAtom,
  tabsAtom,
} from "@/lib/atom";
import { cn, displayNumbers } from "@/lib/utils";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import DropIcon from "@/assets/svg/dropIcon.svg?react";
import EnergyIcon from "@/assets/svg/energyIcon.svg?react";
import { FaChevronRight } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";
import Electrolite from "@/assets/svg/electrolyte.svg";
import multitap from "@/assets/svg/multitap.svg";
import { Toast } from "@/lib/toast";
import { useEffect, useState } from "react";
import { seaCreatures } from "@/lib/seacreatures";

type BoosterTitle = "Electrolyte" | "Multitap";

interface Booster {
  title: BoosterTitle;
  image: string;
  subtitle: string;
}

const Boost = () => {
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const setTabs = useSetRecoilState(tabsAtom);
  const maxEnergy = Number(localStorage.getItem("energyMax") ?? "500");
  const [dailEnergy, setDailEnergy] = useState(
    Number(localStorage.getItem("dailyEnergy") ?? "6")
  );
  const setEnergy = useSetRecoilState(energyAtom);
  const LastEnergyTime = localStorage.getItem("lastEnergyTime");
  const dropsAmount = Number(localStorage.getItem("dropsAmount") ?? "1");
  const setShowConfetti = useSetRecoilState(confettiAtom);

  const currentLevel = useRecoilValue(levelAtom);

  const infoGetter = (booster: BoosterTitle): [number, number] => {
    let drops: number = 2000;
    let leveled: number = currentLevel;

    if (booster === "Electrolyte") leveled = maxEnergy / 500 - 1;
    else leveled = dropsAmount - 1;

    drops = drops * (leveled + 1);

    leveled += 1;

    return [drops, leveled];
  };

  const boosters: Booster[] = [
    {
      image: Electrolite,
      title: "Electrolyte",
      subtitle: "Increase the amount of energy",
    },
    {
      image: multitap,
      title: "Multitap",
      subtitle: "Increase the amount of DROPS you earn per tap",
    },
  ];
  useEffect(() => {
    if (LastEnergyTime) {
      const now = new Date();
      const timeDiff = now.getTime() - new Date(LastEnergyTime).getTime();
      const hoursPassed = timeDiff / (1000 * 60 * 60);
      if (hoursPassed >= 24) {
        localStorage.setItem("dailyEnergy", "6");
        setDailEnergy(6);
      }
    }
  }, [LastEnergyTime]);

  return (
    <div className="py-5 px-5 flex flex-col items-center">
      <h2 className="text-[20px] leading-6 font-medium pl-3">Your balance</h2>
      <h2 className="flex items-center gap-2 justify-center mt-[17px]">
        <DropIcon height={28} width={28} className="-mt-1" />
        <span className="text-[33px] font-extrabold leading-6">
          {displayNumbers(balance)}
        </span>
      </h2>
      <div className="pt-10 flex flex-col w-full">
        <h2 className=" font-extrabold text-sm leading-6 mb-1 ml-1">
          Free daily boosters
        </h2>
        <Drawer>
          <DrawerTrigger asChild disabled={dailEnergy === 0}>
            <Button className="flex items-center bg-[#C3C3C33D] h-[62px] justify-between w-full">
              <div className="flex items-center gap-2">
                <EnergyIcon />
                <div className="flex flex-col">
                  <div className="font-bold text-[11px] leading-6">
                    <h2 className="text-xs leading-6 font-bold">Full energy</h2>
                    <h2 className="text-xs font-semibold leading-6 text-start">
                      {dailEnergy}/6
                    </h2>
                  </div>
                </div>
              </div>
              <FaChevronRight color="white" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col items-center pb-10 pt-7">
            <DrawerTitle className="ml-auto mr-5">
              <DrawerClose>
                <IoCloseCircleSharp color="#FFFFFF80" size={25} />
              </DrawerClose>
            </DrawerTitle>
            <EnergyIcon className="h-[6.5rem] w-[6.5rem]" />
            <div className="font-bold text-[24px] leading-[18px] mt-6 mb-2">
              Full energy
            </div>
            <p className="text-sm font-extrabold text-white leading-[18px] text-center mt-2 mb-6 px-8">
              Recharge your energy to the maximum and do another round of
              hydrating
            </p>
            <div className="text-sm font-extrabold text-white leading-[18px] text-center mb-6 px-8 flex gap-1 items-center">
              <DropIcon className="h-6 w-6" />
              <span className="text-[24px] font-bold text-white leading-[18px]">
                Free
              </span>
            </div>
            <DrawerClose
              className="w-[250px] bg-[#9712F4] h-[48px] font-bold text-[16px] leading-5 rounded-[30px]"
              style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              onClick={() => {
                localStorage.setItem(
                  "dailyEnergy",
                  (dailEnergy - 1).toString()
                );
                localStorage.setItem(
                  "lastEnergyTime",
                  new Date().toISOString()
                );
                setDailEnergy(dailEnergy - 1);

                setEnergy(maxEnergy);
                Toast("Energy successfully recharged", "info");
                setTimeout(() => {
                  setTabs((tabs) =>
                    tabs.length === 1 ? tabs : tabs.slice(0, tabs.length - 1)
                  );
                }, 20);
              }}
            >
              Get
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex flex-col gap-2 mt-1   w-full">
        <h2 className=" font-extrabold text-sm leading-6 mb-1 ml-1">
          Boosters
        </h2>
        {boosters.map((booster, idx) => {
          const [drops, level] = infoGetter(booster.title);
          const seacreatureTitle = seaCreatures[level].title;

          return (
            <Drawer key={idx}>
              <DrawerTrigger asChild disabled={level > currentLevel}>
                <Button className="flex items-center bg-[#C3C3C33D] h-[62px] justify-between w-full">
                  <div className="flex items-center gap-2">
                    <img
                      src={booster.image}
                      alt={booster.title}
                      className="h-9 w-9"
                    />
                    <div className="flex flex-col">
                      <div className="text-xs leading-6 font-bold text-start">
                        {booster.title}
                      </div>
                      <div className="flex items-center -mt-1 -ml-1">
                        <div className="font-extrabold text-[11px] leading-6 flex items-center gap-[2px]">
                          <DropIcon className="h-3 w-3 -mt-[2px]" />
                          {drops}
                          <span className="font-bold">
                            - {seacreatureTitle} level
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <FaChevronRight color="white" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="flex flex-col items-center pb-8 pt-7">
                <DrawerTitle className="ml-auto mr-5">
                  <DrawerClose>
                    <IoCloseCircleSharp color="#FFFFFF80" size={25} />
                  </DrawerClose>
                </DrawerTitle>
                <img
                  src={booster.image}
                  alt={`${booster.title}`}
                  className="w-[153px]"
                />
                <div className="font-bold text-[24px] leading-[18px] mt-6 mb-2">
                  {booster.title}
                </div>
                <h2 className="text-sm font-extrabold my-2 px-10 text-center">
                  {booster.subtitle}
                </h2>
                <p className="font-medium text-sm leading-[18px] mb-5">
                  {booster.title === "Electrolyte"
                    ? "+500 energy points for " + seacreatureTitle
                    : "+" +
                      (dropsAmount + 1) +
                      " DROPS per tap for " +
                      seacreatureTitle}
                </p>
                <p className="text-sm font-extrabold text-white leading-[18px] mt-2 mb-6 flex items-center gap-1">
                  <DropIcon className="mt-1" />{" "}
                  <span className="text-[24px] font-bold">
                    {displayNumbers(drops)}
                  </span>
                  <span className="font-bold">{seacreatureTitle} level</span>
                </p>

                <DrawerClose
                  className={cn(
                    "w-[250px] bg-[#9712F4] h-[48px] font-bold text-[16px] leading-5 rounded-[30px]",
                    balance < drops ? "bg-[#7054a5]" : ""
                  )}
                  style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
                  onClick={() => {
                    if (booster.title === "Multitap") {
                      localStorage.setItem(
                        "dropsAmount",
                        (dropsAmount + 1).toString()
                      );
                    } else {
                      setEnergy(1000);
                      localStorage.setItem(
                        "energyMax",
                        (maxEnergy + 500).toString()
                      );
                    }
                    setTimeout(() => {
                      setTabs((tabs) =>
                        tabs.length === 1
                          ? tabs
                          : tabs.slice(0, tabs.length - 1)
                      );
                    }, 20);
                    const newBalance = balance - drops;
                    setBalance(newBalance);
                    setShowConfetti(true);
                    Toast(
                      booster.title === "Electrolyte"
                        ? "Boost has been increased by 500 points"
                        : "You can now earn " +
                            (dropsAmount + 1) +
                            " DROPS per tap",
                      "info"
                    );
                    localStorage.setItem("balance", newBalance.toString());
                  }}
                  disabled={balance < drops}
                >
                  {balance < drops ? "Insufficeint Funds" : "Get"}
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          );
        })}
      </div>
    </div>
  );
};

export default Boost;
