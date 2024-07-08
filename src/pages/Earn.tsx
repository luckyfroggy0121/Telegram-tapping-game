import SaveIcon from "@/assets/svg/save.svg?react";
import DropIcon from "@/assets/svg/dropIcon.svg?react";
import Telegram from "@/assets/images/tele.png";
import Twitter from "@/assets/svg/earn/twitter.svg";
import Youtube from "@/assets/svg/earn/youtube.svg";
import Community from "@/assets/images/community.png";
import DailPump from "@/assets/images/dailpump.png";
import JoinTank from "@/assets/svg/tank.svg";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa6";
import Diamond from "@/assets/images/diamond.png";
import { displayNumbers } from "@/lib/utils";
// import { LiaCheckSolid } from "react-icons/lia";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DailyPump from "@/components/common/DailyPump";
import { IoCloseCircleSharp } from "react-icons/io5";

const tasks = [
  {
    id: 1,
    title: "Join SmartLitre Community",
    drops: 5000,
    image: Telegram,
  },
  {
    id: 2,
    title: "Follow SmartLitre on X/Twitter",
    drops: 5000,
    image: Twitter,
  },
  {
    id: 3,
    title: "Watch SmartLitre Game Demo",
    drops: 5000,
    image: Youtube,
  },
  {
    id: 4,
    title: "Invite 3 friends",
    drops: 25000,
    image: Community,
  },
  {
    id: 5,
    title: "Daily Pump",
    drops: 6649000,
    image: DailPump,
  },
  {
    id: 6,
    title: "Join a Tank",
    drops: 5000,
    image: JoinTank,
  },
];

const Earn = () => {
  return (
    <div className="px-5 pt-2">
      <div className="font-extrabold text-center text-[20px] leading-6">
        Earn more DROPS
      </div>
      <div className="flex flex-col items-center">
        <DropIcon />
        <SaveIcon className="-mt-4" />
      </div>
      <div className="mt-3 font-extrabold text-[13px] leading-6">Tasks</div>
      <div className="flex flex-col gap-[5px] mt-1 w-full">
        {tasks.map((task, index) => {
          return task.id === 1 || task.id === 2 || task.id === 3 ? (
            <Button
              key={index}
              className="flex items-center bg-[#C3C3C33D] h-[55px] justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <img src={task.image} alt={task.title} className="h-9" />
                <div className="flex flex-col">
                  <div className="font-bold text-[11px] leading-6">
                    {task.title}
                  </div>
                  <div className="flex -ml-1 -mt-1 items-center">
                    <img src={Diamond} alt="diamond" className="h-5" />
                    <div className="font-extrabold text-[11px] leading-6">
                      +{displayNumbers(task.drops)}
                    </div>
                  </div>
                </div>
              </div>
              <FaChevronRight color="white" />
            </Button>
          ) : (
            <Drawer key={index}>
              <DrawerTrigger asChild>
                <Button
                  key={index}
                  className="flex items-center bg-[#C3C3C33D] h-[55px] justify-between w-full"
                >
                  <div className="flex items-center gap-2">
                    <img src={task.image} alt={task.title} className="h-9"  />
                    <div className="flex flex-col">
                      <div className="font-bold text-[11px] leading-6">
                        {task.title}
                      </div>
                      <div className="flex -ml-1 -mt-1 items-center">
                        <img src={Diamond} alt="diamond" className="h-5" />
                        <div className="font-extrabold text-[11px] leading-6">
                          +{displayNumbers(task.drops)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <FaChevronRight color="white" />
                </Button>
              </DrawerTrigger>
              {task.id == 5 ? (
                <DailyPump />
              ) : (
                <DrawerContent className="flex pt-7 pb-8 flex-col items-center">
                  <DrawerTitle className="ml-auto mr-5">
                    <DrawerClose>
                      <IoCloseCircleSharp color="#FFFFFF80" size={25} />
                    </DrawerClose>
                  </DrawerTitle>
                  <img
                    src={task.image}
                    alt={`${task.id}`}
                    className="w-[100px]"
                  />
                  <div className="font-bold text-[24px] leading-[18px] mt-6 mb-2">
                    {task.title}
                  </div>
                  <p className="text-sm font-extrabold text-white leading-[18px] mt-2 mb-6">
                    Earn +{displayNumbers(task.drops)} DROPS
                  </p>
                  <DrawerClose
                    className="w-[250px] bg-[#9712F4] h-[48px] font-bold text-[16px] leading-5 rounded-[30px]"
                    style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
                  >
                    Check
                  </DrawerClose>
                </DrawerContent>
              )}
            </Drawer>
          );
        })}
      </div>
    </div>
  );
};

export default Earn;
