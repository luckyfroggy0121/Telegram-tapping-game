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
import Water from "@/components/common/Water";

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

const CollectionMessage = [
  {
    progress:
      "Collect 5K DROPS to unlock Bronze character and advance to Silver level.",
    completed: "Well done, You’ve unlocked Ray.",
  },
  {
    progress:
      "Collect 50K DROPS to unlock Silver character and advance to Gold level.",
    completed: "Brilliant job! You’ve unlocked Octopus.",
  },
  {
    progress:
      "Collect 500K DROPS to unlock Gold character and advance to Platinum level.",
    completed: "Smashed it! You’ve unlocked Seahorse.",
  },
  {
    progress:
      "Collect 1M DROPS to unlock Gold character and advance to Platinum level.",
    completed: "You’re a Pro Hydrator! You’ve unlocked Anglerfish.",
  },
  {
    progress:
      "Collect 10M DROPS to unlock Diamond character and advance to Epic level.",
    completed: "You’re a Hydration Hero. You’ve unlocked Sea Turtle.",
  },
  {
    progress: "Collect 1B+ DROPS to unlock Epic Character!",
    completed: "The Master of Hydration. You’ve unlocked Jellyfish.",
  },
];

const Leaderboard = () => {
  const currentData = useRecoilValue(currentDataAtom);
  const level = useRecoilValue(levelAtom);
  const [api, setApi] = useState<CarouselApi>();
  const [messageApi, setMessageApi] = useState<CarouselApi>();
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

  useEffect(() => {
    if (!messageApi) return;
    messageApi.scrollTo(
      CollectionMessage.findIndex((_, indx) => indx === currentTab)
    );
  }, [messageApi, currentTab]);

  return (
    currentData && (
      <div className="flex flex-col items-center pt-4 w-full px-5">
        <Carousel setApi={setApi}>
          <CarouselContent className="w-[calc(100vw-8rem)] mt-2">
            {seaCreatures.map(({ Fish, title }, index) => (
              <CarouselItem key={index} className="flex flex-col items-center">
                <div className="font-extrabold text-[36px] leading-6 mb-4">
                  {title}
                </div>
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
                >
                  {level === index && (
                    <Water incomingWaterLevel={currentData.waterlevel} />
                  )}
                </div>
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
        <Carousel setApi={setMessageApi}>
          <CarouselContent className="mt-2 w-[calc(100vw-3rem)]">
            {CollectionMessage.map(({ progress, completed }, idx) => (
              <CarouselItem
                key={idx}
                className="flex items-center justify-center"
              >
                {level > idx ? (
                  <div className="text-center font-bold text-[13px] leading-[18px] text-white/80 max-w-[16rem] mt-2">
                    {completed}
                  </div>
                ) : (
                  <div className="text-center font-bold text-[13px] leading-[18px] text-white/80 max-w-[16rem] mt-2">
                    {progress}
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
