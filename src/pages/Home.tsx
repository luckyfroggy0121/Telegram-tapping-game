/* eslint-disable react-hooks/exhaustive-deps */
import DropIcon from "@/assets/svg/dropIcon.svg?react";
import EnergyIcon from "@/assets/svg/energyIcon.svg?react";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import Controls from "@/components/common/Controls";
import Water from "@/components/common/Water";
import { Button } from "@/components/ui/button";
import { seaCreatures } from "@/lib/seacreatures";
import { cn, displayNumbers } from "@/lib/utils";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  currentDataAtom,
  tabsAtom,
  currentTankAtom,
  levelAtom,
  balanceAtom,
  energyAtom,
} from "@/lib/atom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import toast from "react-hot-toast";

const HomePage = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [tabs, setTabs] = useRecoilState(tabsAtom);
  const setCurrentSeaCreature = useSetRecoilState(currentDataAtom);
  const [currentTank, setCurrentTank] = useRecoilState(currentTankAtom);
  const [level, setLevel] = useRecoilState(levelAtom);
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const [energy, setEnergy] = useRecoilState(energyAtom);
  const [numbers, setNumbers] = useState<
    {
      number: number;
      x: number;
      y: number;
    }[]
  >([]);

  const [waterLevel, setWaterLevel] = useState(0);

  const { Medal, drops, title, Fish } = seaCreatures[level];

  const currentLevelProgress = (balance / drops) * 100;

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const addition = eval("100 / (10*(level+1))");
    if (level < 6 && currentLevelProgress <= 100 && energy > 0) {
      setEnergy((prev) => Math.max(prev - 1, 0));
      setBalance(balance + parseInt(addition.toFixed(1)));
      const newProgress = waterLevel + addition;

      setWaterLevel(() => {
        if (newProgress > 100) {
          return 0;
        }
        if (newProgress === 100) return 99;
        return newProgress;
      });
      if (newProgress === 100) {
        setTimeout(() => {
          setWaterLevel(0);
        }, 800);
      }
      const clickX = event.clientX;
      const clickY = event.clientY;
      setNumbers([
        ...numbers,
        { number: parseInt(addition.toFixed(2)), x: clickX, y: clickY },
      ]);
    }
    if (energy === 0) {
      toast.error("You can't pump with no energy.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy((prev) => Math.min(prev + 1, 500)); // Add energy up to 500
    }, 1000);
    if (energy >= 500) clearInterval(timer);
    return () => clearInterval(timer);
  }, [balance]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNumbers([]);
    }, 2000);
    return () => clearTimeout(timer);
  }, [numbers]);

  useEffect(() => {
    if (currentLevelProgress >= 100) {
      setShowConfetti(true);
      setTimeout(() => {
        setLevel(level + 1);
      }, 5000);
      setWaterLevel(0);
    }
  }, [currentLevelProgress]);

  return (
    <>
      <div className="flex px-3 h-full flex-col items-center grow shrink basis-auto">
        {currentTank.name === "" && currentTank.image === "" ? (
          <Button
            onClick={() => {
              setTabs([...tabs, "jointank"]);
            }}
            className="w-[198px] bg-[#AD12F5C2] h-[44px] font-bold text-[16px] leading-5 rounded-[30px]"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            Join Tank
          </Button>
        ) : (
          <Drawer>
            <DrawerTrigger className="flex items-center gap-2 p-2 px-5 justify-between w-full bg-[#8d2aec] rounded-full">
              <div className="flex items-center gap-2">
                <img
                  src={currentTank.image}
                  alt={currentTank.name}
                  className="h-10"
                />
                <div className="font-bold text-[15px]">{currentTank.name}</div>
              </div>
              <FaChevronRight fontSize={24} className="text-white" />
            </DrawerTrigger>
            <DrawerContent className="flex pt-7 pb-8 flex-col items-center">
              <DrawerTitle className="ml-auto mr-5">
                <DrawerClose>
                  <IoCloseCircleSharp color="#FFFFFF80" size={25} />
                </DrawerClose>
              </DrawerTitle>
              <img
                src={currentTank.image}
                alt={currentTank.name}
                className="w-[100px]"
              />
              <div className="font-bold text-[24px] leading-[18px] my-6">
                {currentTank.name}
              </div>
              <DrawerClose
                onClick={() => {
                  setCurrentTank({ name: "", image: "" });
                  toast.error(`You Left the ${currentTank.name} Tank`);
                }}
                className="w-[250px] bg-[#9712F4] h-[48px] font-bold text-[16px] leading-5 rounded-[30px]"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              >
                Leave Tank
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        )}
        <div className="flex mt-1 justify-center items-center gap-2 font-extrabold text-[36px]">
          <DropIcon className="mt-1 h-9" />
          <div>{displayNumbers(parseInt(balance.toFixed(2)))}</div>
        </div>
        <Button
          onClick={() => {
            setCurrentSeaCreature({
              image: Fish,
              medal: title,
              progress: currentLevelProgress,
            });
            setTabs([...tabs, "leaderboard"]);
          }}
          className="bg-[#C3C3C340] gap-2 font-bold text-[15px] w-auto px-6 py-1 justify-center h-auto flex rounded-[11px] items-center"
        >
          <div>{title}</div>
          {Medal && <Medal className="h-5 w-5" />}
        </Button>
        <div className="w-full px-4 mt-3">
          <div className="flex justify-between font-bold">
            <div className="text-[11px]">Hydration Goal</div>
            <div className="text-[10px]">
              Level {level}
              /6
            </div>
          </div>
          <ProgressBar
            completed={currentLevelProgress}
            bgColor="#65E4F0"
            height="5px"
            transitionDuration="0.5s"
            className="mt-1 mb-2"
            isLabelVisible={false}
            borderRadius="10px"
            baseBgColor="#C3C3C340"
          />
          <div className="items-center mt-2 flex gap-1">
            <EnergyIcon />
            <div className="font-extrabold text-[10px]">{energy}/500</div>
          </div>
        </div>
        {numbers.map((num, index) => (
          <AnimatedNumber
            key={index}
            number={num.number}
            x={num.x - 220}
            y={num.y - 80}
          />
        ))}
        <div className="flex h-full w-full justify-center items-center grow shrink basis-auto">
          <div
            onClick={handleClick}
            className={cn(
              "w-full z-20 bg-contain bg-center bg-no-repeat bg-[#5417b0] relative overflow-hidden mt-2",
              currentLevelProgress >= 100 ? "animate-bounce" : ""
            )}
            style={
              currentLevelProgress >= 100
                ? {
                    backgroundImage: `url(${Fish})`,
                    backgroundColor: "transparent",
                    height: title === "Bronze" ? 126 : 220,
                  }
                : {
                    maskImage: `url(${Fish})`,
                    maskSize: "100% 100%",
                    maskPosition: "center",
                    height: title === "Bronze" ? 126 : 220,
                  }
            }
          >
            {waterLevel < 100 && waterLevel > 0 && (
              <Water incomingWaterLevel={waterLevel} />
            )}
          </div>
          {showConfetti && (
            <Confetti
              className="w-full h-screen absolute top-0 z-50"
              numberOfPieces={1500}
              recycle={false}
              gravity={0.09}
            />
          )}
        </div>
      </div>
      <Controls />
    </>
  );
};

export default HomePage;
