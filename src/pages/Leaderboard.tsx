import { currentDataAtom, levelAtom, tabsAtom } from "@/lib/atom";
import { useRecoilValue } from "recoil";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { seaCreatures } from "@/lib/seacreatures";
import ProgressBar from "@ramonak/react-progress-bar";
import Diamond from "@/assets/images/diamond.png";
import { displayNumbers } from "@/lib/utils";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const people = [
  {
    name: "Hina",
    drops: 45000,
  },
  {
    name: "Zainab",
    drops: 42000,
  },
  {
    name: "Abbas",
    drops: 41000,
  },
  {
    name: "Falak",
    drops: 40000,
  },
  {
    name: "Nurah",
    drops: 38000,
  },
  {
    name: "Saffy",
    drops: 37000,
  },
  {
    name: "Mikky",
    drops: 36000,
  },
  {
    name: "Jibby",
    drops: 35000,
  },
];

const Leaderboard = () => {
  const currentData = useRecoilValue(currentDataAtom);
  const level = useRecoilValue(levelAtom);
  const [api, setApi] = useState<CarouselApi>();
  const tabs = useRecoilValue(tabsAtom);

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // set selected index to the index of the current sea creature
    if (tabs.includes("leaderboard"))
      setTimeout(() => {
        api.scrollTo(
          seaCreatures.findIndex(
            (seaCreature) => seaCreature.title === currentData?.medal
          )
        );
      }, 50);
    setCurrentTab(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentTab(api.selectedScrollSnap());
    });
  }, [api, currentData, tabs]);

  return (
    currentData && (
      <div className="flex flex-col items-center pt-4 w-full px-5">
        <div className="font-extrabold text-[36px] leading-6">
          {currentData.medal}
        </div>
        <Carousel setApi={setApi}>
          <CarouselContent className="w-[calc(100vw-8rem)] mt-2">
            {seaCreatures.map(({ Fish }, index) => (
              <CarouselItem key={index} className="">
                <div
                  className="h-[6rem] w-full bg-no-repeat bg-contain bg-center bg-[#5417b0] relative overflow-hidden mt-2"
                  style={
                    level > index
                      ? {
                          backgroundImage: `url(${Fish})`,
                          backgroundColor: "transparent",
                        }
                      : {
                          maskImage: `url(${Fish})`,
                          maskSize: "100% 100%",
                          maskPosition: "center",
                        }
                  }
                ></div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <ProgressBar
          completed={
            currentTab < level
              ? 100
              : currentTab === level
              ? currentData.progress
              : 0
          }
          bgColor="#65E4F0"
          height="5px"
          className="mt-2 w-full"
          isLabelVisible={false}
          borderRadius="10px"
          baseBgColor="#C3C3C340"
        />
        <div className="text-center font-bold text-[13px] leading-[18px] text-white/80 max-w-[16rem] mt-2">
          Collect 500K DROPS to unlock Gold character and advance to Platinum
          level.
        </div>
        <div className="w-full flex flex-col gap-2 mt-5">
          {people.map((person, index) => (
            <div
              key={index}
              className="flex bg-[#C3C3C33D] rounded-[11px] py-3 pl-3 pr-7 justify-between items-center w-full"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full w-[3rem] flex items-center justify-center h-[3rem] border-white border px-1 pb-3 pt-2 bg-[#934dca]">
                  <div
                    className="w-full h-full bg-contain bg-center bg-[#5417b0] relative overflow-hidden mt-2"
                    style={
                      currentData.progress === 100
                        ? {
                            backgroundImage: `url(${currentData.image})`,
                            backgroundColor: "transparent",
                          }
                        : {
                            maskImage: `url(${currentData.image})`,
                            maskSize: "100% 100%",
                            maskPosition: "center",
                          }
                    }
                  ></div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-[11px]">{person.name}</div>
                  <div className="flex items-center">
                    <img src={Diamond} alt="diamond" className="h-4 w-4" />
                    <div className="font-extrabold text-[11px]">
                      {displayNumbers(person.drops)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-extrabold text-[10px]">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Leaderboard;
