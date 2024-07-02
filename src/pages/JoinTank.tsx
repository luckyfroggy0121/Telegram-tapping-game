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
import { ScrollArea } from "@/components/ui/scroll-area";

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
  return (
    <div className="pt-5 flex flex-col px-6 items-center">
      <div className="font-extrabold text-center text-[36px] leading-6 text-white">
        Join Tank
      </div>
      <img src={Fishes} className="mt-3 w-[20rem]" />
      <div className="text-white/80 font-bold text-[16px] text-center mt-3 max-w-[18rem]">
        Which tank do you want to join and see us being listed on?
      </div>
      <ScrollArea className="rounded-[11px] mt-2 w-full bg-[#C3C3C340]">
        {tanks.map(({ name, image, Medal }, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 justify-between"
          >
            <div className="flex items-center gap-2">
              <img src={image} alt={name} className="h-10" />
              <div className="font-bold text-white text-[15px]">{name}</div>
            </div>
            {Medal ? (
              <Medal className="h-5 w-5" />
            ) : (
              <div className="text-white">{index + 1}</div>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default JoinTank;
