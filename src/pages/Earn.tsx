import SaveIcon from "@/assets/svg/save.svg?react";
import DropIcon from "@/assets/svg/dropIcon.svg";
import Telegram from "@/assets/images/tele.gif";
import Twitter from "@/assets/images/twitter.gif";
import Youtube from "@/assets/images/youtube.gif";
import Community from "@/assets/images/community.png";
import DailPump from "@/assets/images/dailpump.png";
import JoinTank from "@/assets/images/jointank.png";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa6";
import Diamond from "@/assets/images/diamond.png";
import { displayNumbers } from "@/lib/utils";
// import { LiaCheckSolid } from "react-icons/lia";

const tasks = [
  {
    title: "Join SmartLitre Community",
    drops: 5000,
    image: Telegram,
  },
  {
    title: "Follow SmartLitre on X/Twitter",
    drops: 5000,
    image: Twitter,
  },
  {
    title: "Watch SmartLitre Game Demo",
    drops: 5000,
    image: Youtube,
  },
  {
    title: "Invite 3 friends",
    drops: 25000,
    image: Community,
  },
  {
    title: "Daily Pump",
    drops: 6649000,
    image: DailPump,
  },
  {
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
        <img src={DropIcon} alt="drop" className="h-12 mt-2" />
        <SaveIcon className="-mt-4" />
      </div>
      <div className="mt-3 font-extrabold text-[13px] leading-6">Tasks</div>
      <div className="flex flex-col gap-[5px] mt-1 w-full">
        {tasks.map((task, index) => (
          <Button
            key={index}
            className="flex items-center bg-[#C3C3C33D] h-auto justify-between w-full"
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
        ))}
      </div>
    </div>
  );
};

export default Earn;
