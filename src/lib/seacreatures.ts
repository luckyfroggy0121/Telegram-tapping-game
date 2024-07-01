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

export const seaCreatures = [
  {
    name: "Rayfish",
    Medal: bronze,
    title: "Bronze",
    Fish: Rayfish,
    diamonds: 5000,
    height: 166,
  },
  {
    name: "Octopus",
    Medal: silver,
    title: "Silver",
    Fish: Octopus,
    diamonds: 50000,
    height: 223,
  },
  {
    name: "Seahorse",
    Fish: Seahorse,
    Medal: gold,
    title: "Gold",
    diamonds: 500000,
    height: 221,
  },
  {
    name: "Draken",
    Fish: Draken,
    Medal: platinum,
    title: "Platinum",
    diamonds: 1000000,
    height: 218,
  },
  {
    name: "Turtle",
    Fish: Turtle,
    Medal: diamond,
    title: "Diamond",
    diamonds: 100000000,
    height: 219,
  },
  {
    name: "Jellyfish",
    Fish: Jellyfish,
    title: "Diamond",
    diamonds: 1000000000,
    height: 229,
  },
];
