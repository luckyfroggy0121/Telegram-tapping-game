import Rayfish from "@/assets/images/rayfish.png";
import Octopus from "@/assets/images/octopus.png";
import Seahorse from "@/assets/images/seahorse.png";
import Draken from "@/assets/images/darken.png";
import Turtle from "@/assets/images/turtle.png";
import Jellyfish from "@/assets/images/jellyfish.png";
import bronze from "@/assets/svg/bronze.svg?react";
import silver from "@/assets/svg/silver.svg?react";
import gold from "@/assets/svg/gold.svg?react";
import platinum from "@/assets/svg/platinum.svg?react";
import diamond from "@/assets/svg/diamond.svg?react";

export const seaCreatures = [
  {
    name: "Rayfish",
    medal: bronze,
    title: "Bronze",
    image: Rayfish,
    diamonds: 5000,
  },
  {
    name: "Octopus",
    medal: silver,
    title: "Silver",
    image: Octopus,
    diamonds: 50000,
  },
  {
    name: "Seahorse",
    image: Seahorse,
    medal: gold,
    title: "Gold",
    diamonds: 500000,
  },
  {
    name: "Draken",
    image: Draken,
    medal: platinum,
    title: "Platinum",
    diamonds: 1000000,
  },
  {
    name: "Turtle",
    image: Turtle,
    medal: diamond,
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
