import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { balanceAtom, energyAtom, tabsAtom } from "@/lib/atom";
import { cn, displayNumbers } from "@/lib/utils";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import DropIcon from "@/assets/svg/dropIcon.svg?react";
import EnergyIcon from "@/assets/svg/energyIcon.svg?react";
import { FaChevronRight } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";
import Electrolite from "@/assets/svg/electrolyte.svg";
import multitap from "@/assets/svg/multitap.svg";
import { Toast } from "@/lib/toast";

const boosters = [
  {
    image: Electrolite,
    title: "Electrolyte",
    subtitle: "Increase the amount of energy",
    desc: "+500 energy points for Silver level",
    drops: 3000,
    level: "Silver",
    message: "Boost has been increased by 500 points",
  },
  {
    image: multitap,
    title: "Multitap",
    subtitle: "Increase the amount of DROPS you earn per tap",
    desc: "+2 DROPS per tap for Silver level",
    drops: 2000,
    level: "Silver",
    message: "You can now earn +2 DROPS per tap",
  },
];

const Boost = () => {
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const setTabs = useSetRecoilState(tabsAtom);
  const dailEnergy = localStorage.getItem("dailyEnergy") ?? "6";
  const setEnergy = useSetRecoilState(energyAtom);

  return (
    <div className="py-5 px-5 flex flex-col items-center">
      <h2 className="text-[20px] leading-6 font-medium pl-3">Your balance</h2>
      <h2 className="flex items-center gap-2 justify-center mt-[17px]">
        <DropIcon className="h-9 -mt-1" />
        <span className="text-[33px] font-extrabold leading-6">
          {displayNumbers(balance)}
        </span>
      </h2>
      <div className="pt-10 flex flex-col w-full">
        <h2 className=" font-extrabold text-sm leading-6 mb-1 ml-1">
          Free daily boosters
        </h2>
        <Drawer>
          <DrawerTrigger asChild>
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
                  (Number(dailEnergy) - 1).toString()
                );
                setEnergy(500);
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
        {boosters.map((booster, idx) => (
          <Drawer key={idx}>
            <DrawerTrigger
              asChild
              disabled={
                idx === 0
                  ? localStorage.getItem("energyMax") === "1000"
                  : localStorage.getItem("dropsAmount") === "2"
              }
            >
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
                        <DropIcon className="h-3   w-3   -mt-[2px]" />
                        {displayNumbers(booster.drops)}
                        <span className="font-bold">
                          - {booster.level} level
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
                {booster.desc}
              </p>
              <p className="text-sm font-extrabold text-white leading-[18px] mt-2 mb-6 flex items-center gap-1">
                <DropIcon className="mt-1" />{" "}
                <span className="text-[24px] font-bold">
                  {displayNumbers(booster.drops)}
                </span>
                <span className="font-bold">{booster.level} level</span>
              </p>
              <DrawerClose
                className={cn(
                  "w-[250px] bg-[#9712F4] h-[48px] font-bold text-[16px] leading-5 rounded-[30px]",
                  balance < booster.drops ? "bg-[#7054a5]" : ""
                )}
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
                onClick={() => {
                  if (booster.title === "Multitap") {
                    localStorage.setItem("dropsAmount", "2");
                  } else {
                    setEnergy(1000);
                    localStorage.setItem("energyMax", "1000");
                  }
                  Toast(booster.message, "info");
                  setTimeout(() => {
                    setTabs((tabs) =>
                      tabs.length === 1 ? tabs : tabs.slice(0, tabs.length - 1)
                    );
                  }, 20);
                  setBalance(balance - booster.drops);
                }}
                disabled={balance < booster.drops}
              >
                {balance < booster.drops ? "Insufficeint Funds" : "Get"}
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
};

export default Boost;
