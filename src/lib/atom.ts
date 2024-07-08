import { CurrentData } from "@/interface/currentData";
import { CurrentTank } from "@/interface/currentTank";
import { atom } from "recoil";

export const tabsAtom = atom({
  key: "tabsATom",
  default: ["home"],
});

export const currentDataAtom = atom<CurrentData>({
  key: "currentSeaCreatureAtom",
  default: undefined,
});

export const currentTankAtom = atom<CurrentTank>({
  key: "currentTank",
  default: { name: "", image: "" },
});

export const levelAtom = atom<number>({
  key: "levelAtom",
  default: 0,
});

export const balanceAtom = atom<number>({
  key: "balanceAtom",
  default: 4990,
});

export const energyAtom = atom<number>({
  key: "energyAtom",
  default: 500,
});
