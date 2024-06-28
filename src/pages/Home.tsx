import { seaCreatures } from "@/lib/seacreatures";
import Prize from "@/components/common/Prize";

const HomePage = () => {
  const random = Math.floor(Math.random() * seaCreatures.length);
  const randomseaCreature = seaCreatures[random];

  return (
    <div className="flex h-[calc(100%-200px)] flex-col items-center pt-2">
      <Prize
        medalTitle={randomseaCreature.title}
        diamonds={randomseaCreature.diamonds}
        Icon={randomseaCreature.medal}
        index={random}
      />
      <div className="h-full flex justify-center items-center">
        <img src={randomseaCreature.image} alt="fish" className="w-[85%]" />
      </div>
    </div>
  );
};

export default HomePage;
