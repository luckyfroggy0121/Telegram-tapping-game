import { CurrentData } from "@/interface/currentData";
import { CurrentTank } from "@/interface/currentTank";
import { Balance, level } from "@/interface/level";
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

export const levelAtom = atom<level>({
  key: "levelAtom",
  default: { level:1 },
});

export const balanceAtom = atom<Balance>({
  key: "balanceAtom",
  default: { balance: 0 },
});
