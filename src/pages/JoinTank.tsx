import Fishes from "@/assets/images/fishes.gif";
import binance from "@/assets/images/binance.png";
import bybit from "@/assets/images/bybit.png";
import okxx from "@/assets/images/okxx.png";
import bingx from "@/assets/images/bingx.png";
import htx from "@/assets/images/htx.png";
import kucoin from "@/assets/images/kucoin.png";
import mexc from "@/assets/images/mexc.png";
import binanceMedal from "@/assets/svg/binance-medal.svg?react";
import bybitMedal from "@/assets/svg/bybit-medal.svg?react";
import okxxMedal from "@/assets/svg/okxx-medal.svg?react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentTankAtom, tabsAtom } from "@/lib/atom";
import toast from "react-hot-toast";

const tanks = [
  {
    name: "Binance",
    image: binance,
    Medal: binanceMedal,
  },
  {
    name: "Bybit",
    image: bybit,
    Medal: bybitMedal,
  },
  {
    name: "Okxx",
    image: okxx,
    Medal: okxxMedal,
  },
  {
    name: "Bingx",
    image: bingx,
  },
  {
    name: "HTX",
    image: htx,
  },
  {
    name: "Kucoin",
    image: kucoin,
  },
  {
    name: "Mexc",
    image: mexc,
  },
];

const JoinTank = () => {
  const [, setCurrentTank] = useRecoilState(currentTankAtom);
  const setTabs = useSetRecoilState(tabsAtom);
  return (
    <div className="pt-5 flex flex-col px-6 items-center">
      <div className="font-extrabold text-center text-[36px] leading-6">
        Join Tank
      </div>
      <img src={Fishes} className="mt-3 w-[20rem]" />
      <div className="text-white/80 font-bold text-[16px] text-center mt-3 max-w-[18rem]">
        Which tank do you want to join and see us being listed on?
      </div>
      <div className="rounded-[11px] mt-2 w-full bg-[#C3C3C340]">
        {tanks.map((tank, index) => (
          <Drawer key={index}>
            <DrawerTrigger className="flex items-center gap-2 p-3 justify-between w-full">
              <div className="flex items-center gap-2">
                <img src={tank.image} alt={tank.name} className="h-10" />
                <div className="font-bold text-[15px]">{tank.name}</div>
              </div>
              {tank.Medal ? (
                <tank.Medal className="h-5 w-5" />
              ) : (
                <div>{index + 1}</div>
              )}
            </DrawerTrigger>
            <DrawerContent className="flex pt-7 pb-8 flex-col items-center">
              <DrawerTitle className="ml-auto mr-5">
                <DrawerClose>
                  <IoCloseCircleSharp color="#FFFFFF80" size={25} />
                </DrawerClose>
              </DrawerTitle>
              <img src={tank.image} alt={tank.name} className="w-[100px]" />
              <div className="font-bold text-[24px] leading-[18px] my-6">
                {tank.name}
              </div>
              <DrawerClose
                onClick={() => {
                  setCurrentTank(tank);
                  setTabs((tabs) =>
                    tabs.length === 1 ? tabs : tabs.slice(0, tabs.length - 1)
                  );
                  toast.success(`You joined the ${tank.name} Tank`, {
                    className:
                      "!w-full !rounded-full !bg-[#6a1fc9] !text-white !font-bold !flex !items-center !justify-start ",
                    iconTheme: {
                      primary: "white",
                      secondary: "#6a1fc9",
                    },
                  });
                }}
                className="w-[250px] bg-[#9712F4] h-[48px] font-bold text-[16px] leading-5 rounded-[30px]"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              >
                Join Tank
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
};

export default JoinTank;
