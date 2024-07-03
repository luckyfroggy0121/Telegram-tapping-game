import Rayfish from "@/assets/svg/rayfish.svg";
import Octopus from "@/assets/svg/octopus.svg";
import Seahorse from "@/assets/svg/seahorse.svg";
import Draken from "@/assets/svg/draken.svg";
import Turtle from "@/assets/svg/turtle.svg";
import Jellyfish from "@/assets/svg/jellyfish.svg";
import bronze from "@/assets/svg/bronze.svg?react";
import silver from "@/assets/svg/silver.svg?react";
import gold from "@/assets/svg/gold.svg?react";
import platinum from "@/assets/svg/platinum.svg?react";
import diamond from "@/assets/svg/diamond.svg?react";
import { SeaCreature } from "@/interface/SeaCreature";

export const seaCreatures: SeaCreature[] = [
  {
    name: "Rayfish",
    Medal: bronze,
    title: "Bronze",
    Fish: Rayfish,
    drops: 5000,
  },
  {
    name: "Octopus",
    Medal: silver,
    title: "Silver",
    Fish: Octopus,
    drops: 50000,
  },
  {
    name: "Seahorse",
    Fish: Seahorse,
    Medal: gold,
    title: "Gold",
    drops: 500000,
  },
  {
    name: "Draken",
    Fish: Draken,
    Medal: platinum,
    title: "Platinum",
    drops: 1000000,
  },
  {
    name: "Turtle",
    Fish: Turtle,
    Medal: diamond,
    title: "Diamond",
    drops: 100000000,
  },
  {
    name: "Jellyfish",
    Fish: Jellyfish,
    title: "Epic",
    drops: 1000000000,
  },
];
