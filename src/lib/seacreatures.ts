import Rayfish from "@/assets/svg/rayfish.svg";
import Octopus from "@/assets/svg/octopus.svg";
import Seahorse from "@/assets/svg/seahorse.svg";
import Draken from "@/assets/svg/darken.svg";
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
    image: Rayfish,
    diamonds: 5000,
  },
  {
    name: "Octopus",
    Medal: silver,
    title: "Silver",
    image: Octopus,
    diamonds: 50000,
  },
  {
    name: "Seahorse",
    image: Seahorse,
    Medal: gold,
    title: "Gold",
    diamonds: 500000,
  },
  {
    name: "Draken",
    image: Draken,
    Medal: platinum,
    title: "Platinum",
    diamonds: 1000000,
  },
  {
    name: "Turtle",
    image: Turtle,
    Medal: diamond,
    title: "Diamond",
    diamonds: 100000000,
  },
  {
    name: "Jellyfish",
    image: Jellyfish,
    title: "Diamond",
    diamonds: 1000000000,
  },
];
