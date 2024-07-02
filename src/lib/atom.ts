import { atom } from "recoil";

export const fishState = atom({
  key: "fishState",
  default: 0,
});

export const tabsAtom = atom({
  key: "tabsATom",
  default: ["home"],
});
