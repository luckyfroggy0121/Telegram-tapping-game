import FriendsIcon from "@/assets/svg/friends.svg";
import telegram from "@/assets/svg/telegram.svg";
import premium from "@/assets/images/premium.gif";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import HandIcon from "@/assets/svg/hand.svg?react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { displayNumbers } from "@/lib/utils";
import { LevelDatable } from "@/components/common/level-datatable";
import { LevelFriend } from "@/interface/LevelFriend";
import DropIcon from "@/assets/svg/dropIcon.svg?react";
import { seaCreatures } from "@/lib/seacreatures";

const inviteOptions = [
  {
    title: "Telegram User",
    drops: 2500,
    image: telegram,
  },
  {
    title: "Premium User",
    drops: 25000,
    image: premium,
  },
];

const friends = [
  {
    name: "Athar",
    level: "Bronze",
    amount: 2000,
    option: "Telegram User",
  },
  {
    name: "Athar",
    level: "Bronze",
    amount: 2000,
    option: "Telegram User",
  },
  {
    name: "Athar",
    level: "Bronze",
    amount: 25000,
    option: "Premium User",
  },
  {
    name: "Athar",
    level: "Bronze",
    amount: 25000,
    option: "Premium User",
  },
];

const friendsLevel: LevelFriend[] = [
  {
    level: "Bronze",
    friend: 2500,
    premium: 25000,
  },
  {
    level: "Silver",
    friend: 10000,
    premium: 50000,
  },
  {
    level: "Gold",
    friend: 25000,
    premium: 75000,
  },
  {
    level: "Platinum",
    friend: 5000,
    premium: 250000,
  },
  {
    level: "Diamond",
    friend: 100000,
    premium: 500000,
  },
  {
    level: "Epic",
    friend: 1000000,
    premium: 5000000,
  },
];

const Friends = () => {
  return (
    <div className="flex flex-col pt-3 items-center">
      <div className="font-extrabold text-[20px]">Friends</div>
      <img src={FriendsIcon} alt="friends" className="w-[10rem] mt-2" />
      <div className="font-extrabold text-[14px] leading-[18px] mt-2 text-white/80">
        Invite friends and earn more DROPS
      </div>
      <div className="flex gap-3 mt-5">
        {inviteOptions.map((option, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-[#C3C3C31C] rounded-[11px] py-3 px-5"
            style={{
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
          >
            <div className="font-extrabold text-[15px]">{option.title}</div>
            <img
              src={option.image}
              alt={option.title}
              className="h-[3rem] mt-[9px]"
            />
            <div className="flex items-center gap-0.5 mt-2">
              <DropIcon className="h-5 w-5" />
              <div className="font-extrabold text-[20px]">
                {displayNumbers(option.drops)}
              </div>
            </div>
            <div className="text-white/80 mt-[5px] font-extrabold text-[11px]">
              For you and your friend
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-5 px-12 w-full">
        <Button
          className="bg-[#9712F4] font-bold h-12 w-full text-[16px] rounded-full"
          style={{
            boxShadow: "0px 4px 4px 0px #00000040",
          }}
        >
          Invite Friends
        </Button>

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              className="bg-[#BB73F569] font-bold h-12 w-full text-[16px] rounded-full"
              style={{
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              Level Up Bonus
            </Button>
          </DrawerTrigger>
          <DrawerContent className="pt-6 flex flex-col items-center pb-3">
            <DrawerTitle className="flex items-center w-full justify-between mr-5">
              <div></div>
              <div className="font-extrabold translate-x-4 text-[24px] leading-6">
                Level Up Bonus
              </div>
              <DrawerClose>
                <IoCloseCircleSharp color="#FFFFFF80" size={25} />
              </DrawerClose>
            </DrawerTitle>
            <DropIcon className="mt-2 h-11 w-11" />
            <HandIcon height={50} />
            <div className="text-white/80 text-center text-[14px] font-extrabold leading-[18px] mt-4 mb-2">
              Earn more DROPS when a friend reaches a certain level
            </div>
            <LevelDatable data={friendsLevel} />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex flex-col gap-2 px-5 mt-3 w-full">
        <div className="font-extrabold text-[15px] leading-[24px]">
          Friends List
        </div>
        <div className="flex flex-col gap-3 mt-2 w-full">
          {friends.map((friend, index) => {
            const option = inviteOptions.find(
              (option) => option.title === friend.option
            );
            return (
              <div
                key={index}
                className="bg-[#C3C3C33D] pl-2 py-2 rounded-[11px] flex justify-between pr-5 items-center w-full"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-[2.5rem] flex items-center justify-center h-[2.5rem] border-white border px-1 pb-3 pt-2 bg-[#934dca]">
                    <div
                      className="w-full h-full bg-contain bg-center bg-[#5417b0] relative overflow-hidden mt-2"
                      style={{
                        maskImage: `url(${
                          seaCreatures.find(
                            (seacreature) => seacreature.title === friend.level
                          )?.Fish
                        })`,
                        maskSize: "100% 100%",
                        maskPosition: "center",
                      }}
                    ></div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex items-center gap-1">
                      <img
                        src={option?.image}
                        alt={option?.title}
                        className="w-4 h-4"
                      />
                      <div className="font-bold text-[11px] leading-6">
                        {friend.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 -mt-0.5">
                      <DropIcon className="-mt-1 h-4 w-4" />
                      <div className="font-extrabold text-[11px] leading-6">
                        +{displayNumbers(friend.amount)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="font-extrabold text-[10px] leading-[18px]">
                  +{friend.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Friends;
