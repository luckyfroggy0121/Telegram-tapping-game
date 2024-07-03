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
  default: {name:"",image:""},
})
