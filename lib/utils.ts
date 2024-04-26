const PART1 = [
  "Mr.",
  "Master",
  "Miss",
  "Dr.",
  "Sir",
  "Lord",
  "Lady",
  "Duchess of",
  "Duke of",
  "Madam",
  "Esteemed",
  "Execrable",
  "Inspector",
  "Constable",
  "Emperor",
  "Princess",
  "Comrade",
  "Barmy",
  "Bertie",
  "Martinho",
];

const PART2 = [
  "Rootle",
  "Batasha",
  "Munakka",
  "Amrood",
  "Thanda",
  "Thookie",
  "Wooster",
  "Laddoo",
  "Gulab Jamun",
  "Goon",
  "Muni",
  "Lemongrass",
  "Frankelstein",
  "Percival",
  "Wotherspoon",
  "Prebble",
  "Funcho",
];

export const generateName = () =>
  PART1[Math.floor(Math.random() * PART1.length)] +
  " " +
  PART2[Math.floor(Math.random() * PART2.length)];
