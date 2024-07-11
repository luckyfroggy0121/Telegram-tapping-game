/* eslint-disable react-hooks/exhaustive-deps */
import SaveIcon from "@/assets/svg/save.svg?react";
import DropIcon from "@/assets/svg/dropIcon.svg";
// import DropIcon from "@/assets/images/drop.png";
import Telegram from "@/assets/images/tele.gif";
import Twitter from "@/assets/svg/twitter.svg";
import Youtube from "@/assets/svg/earn/youtube.svg";
import Community from "@/assets/images/community.png";
import DailPump from "@/assets/images/dailpump.png";
import JoinTank from "@/assets/images/jointank.png";
import { Button } from "@/components/ui/button";
import { FaCheck, FaChevronRight } from "react-icons/fa6";
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
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { balanceAtom, currentTankAtom, tabsAtom } from "@/lib/atom";
import { Toast } from "@/lib/toast";

const allTasks = [
  {
    id: 1,
    title: "Join SmartLitre Community",
    drops: 5000,
    image: Telegram,
    completed: false,
    link: "https://t.me/smartlitrecommunity",
  },
  {
    id: 2,
    title: "Follow SmartLitre on X/Twitter",
    drops: 5000,
    image: Twitter,
    completed: false,
    link: "https://x.com/smartlitre?s=21&t=AXJCLgvmsPnKoMsdF5V9Cw",
  },
  {
    id: 3,
    title: "Watch SmartLitre Game Demo",
    drops: 5000,
    image: Youtube,
    completed: false,
    link: "http://www.youtube.com/@SmartLitre",
  },
  {
    id: 4,
    title: "Invite 3 friends",
    drops: 25000,
    image: Community,
    completed: false,
  },
  {
    id: 5,
    title: "Daily Pump",
    drops: 6649000,
    image: DailPump,
    completed: false,
  },
  {
    id: 6,
    title: "Join a Tank",
    drops: 5000,
    image: JoinTank,
    completed: false,
  },
];

const Earn = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const currentTank = useRecoilValue(currentTankAtom);
  const setBalance = useSetRecoilState(balanceAtom);
  const [tabs, setTabs] = useRecoilState(tabsAtom);

  // Initialize state for task completion
  const [tasks, setTasks] = useState(allTasks);

  // Function to handle task completion
  const handleTaskCompletion = (taskId: number) => {
    const task = tasks.filter((t) => t.id === taskId);
    if (!task[0].completed) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
      Toast("Task complete", "info");
      setShowConfetti(true);
    }
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handleLinktasksCompletion = (taskId: number, URL?: string) => {
    if (URL) window.location.href = URL;
    localStorage.setItem("linkTaskId", taskId.toString());
  };

  useEffect(() => {
    const task = tasks.filter((t) => t.id === 6);
    if (currentTank.name !== "" && !task[0].completed) {
      setBalance((prev) => prev + 5000);
      setTasks(
        tasks.map((task) =>
          task.id === 6 ? { ...task, completed: true } : task
        )
      );
      setShowConfetti(true);
      Toast("Task complete", "info");
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  }, [currentTank]);

  useEffect(() => {
    setTimeout(() => {
      const taskId = localStorage.getItem("linkTaskId");
      if (taskId && tabs[1] === "earn") {
        const task = tasks.filter((t) => t.id === parseInt(taskId));
        if (!task[0].completed) {
          setTasks(
            tasks.map((task) =>
              task.id === parseInt(taskId) ? { ...task, completed: true } : task
            )
          );
          setShowConfetti(true);
          Toast("Task complete", "info");
        }
      }
      localStorage.removeItem("linkTaskId");
    }, 1000);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, [tasks]);
  return (
    <div className="px-5 pt-2">
      <div className="font-extrabold text-center text-[20px] leading-6">
        Earn more DROPS
      </div>
      <div className="flex flex-col items-center mt-1">
        <img src={DropIcon} alt="drop" />
        <SaveIcon className="-mt-4" />
      </div>
      <div className="mt-3 font-extrabold text-[13px] leading-6">Tasks</div>
      <div className="flex flex-col gap-[5px] mt-1 w-full">
        {tasks.map((task, index) => {
          return task.id === 1 || task.id === 2 || task.id === 3 ? (
            <Button
              key={index}
              onClick={() =>
                task.completed
                  ? ""
                  : handleLinktasksCompletion(task.id, task.link)
              }
              className={`flex items-center  h-[55px] justify-between w-full ${
                task.completed ? "bg-[#20C962]/50" : "bg-[#C3C3C33D]"
              }`}
            >
              <div className="flex items-center gap-2">
                <img src={task.image} alt={task.title} className="h-9 w-9" />
                <div className="flex flex-col">
                  <div className="font-bold text-[11px] leading-6">
                    {task.title}
                  </div>
                  <div className="flex items-center -mt-1 -ml-1">
                    <img src={Diamond} alt="diamond" className="h-5" />
                    <div className="font-extrabold text-[11px] leading-6">
                      +{displayNumbers(task.drops)}
                    </div>
                  </div>
                </div>
              </div>
              {task.completed ? (
                <FaCheck color="white" />
              ) : (
                <FaChevronRight color="white" />
              )}
            </Button>
          ) : (
            <Drawer key={index}>
              <DrawerTrigger asChild>
                <Button
                  key={index}
                  className={`flex items-center h-[55px] justify-between w-full ${
                    task.completed ? "bg-[#20C962]/50" : "bg-[#C3C3C33D]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={task.image}
                      alt={task.title}
                      className="h-9 w-9"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold text-[11px] leading-6">
                        {task.title}
                      </div>
                      <div className="flex items-center -mt-1 -ml-1">
                        <img src={Diamond} alt="diamond" className="h-5" />
                        <div className="font-extrabold text-[11px] leading-6">
                          +{displayNumbers(task.drops)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {task.completed ? (
                    <FaCheck color="white" />
                  ) : (
                    <FaChevronRight color="white" />
                  )}
                </Button>
              </DrawerTrigger>
              {task.id == 5 ? (
                <DailyPump
                  handleTaskCompletion={() => handleTaskCompletion(task.id)}
                />
              ) : (
                <DrawerContent className="flex flex-col items-center pb-8 pt-7">
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
                    onClick={() => {
                      // task.completed
                      //   ? ""
                      //   : task.id === 6
                      //   ? setTabs([...tabs, "jointank"])
                      //   : handleTaskCompletion(task.id);
                      if (task.completed) {
                        return;
                      }
                      if (task.id === 6) {
                        setTabs([...tabs, "jointank"]);
                      }
                      return;
                    }}
                  >
                    {task.completed ? "Completed" : "Check"}
                  </DrawerClose>
                </DrawerContent>
              )}
            </Drawer>
          );
        })}
        {showConfetti && (
          <Confetti numberOfPieces={1500} recycle={false} gravity={0.09} />
        )}
      </div>
    </div>
  );
};

export default Earn;
