import type { Memory } from "@/types/dog";

export const memories: Memory[] = [
  {
    id: "m1",
    date: "2023-12-02",
    title: "The day we met",
    story:
      "Saw a posting on Facebook about a seller who was looking for a new home for a 2-month-old Shih Tzu puppy. We immediately contacted the seller and arranged to meet the puppy. It was love at first sight! We decided to buy her and named her Mitzu. She has been a bundle of joy ever since.",
    photos: ["p1", "p11"],
    tags: ["puppy", "beginnings"],
  },
  {
    id: "m2",
    date: "2023-12-25",
    title: "First Christmas",
    story:
      "Spend holiday with Mommy in her hometown in Quezon. Mitzu was very excited to see the Christmas tree and the presents. She was also very happy to meet her new family members and friends.",
    photos: ["p17"],
    tags: ["adventures", "milestones"],
  },
  {
    id: "m3",
    date: "2025-10-28",
    title: "Spooky Halloween",
    story: "Mitzu loved her Halloween costume! She was Chuckie for the occasion.",
    photos: ["p16"],
    tags: ["costume", "goofy"],
  },
  {
    id: "m4",
    date: "2026-04-20",
    title: "New Start, Fresh Cut",
    story:
      "Mitzu had a fresh cut and looked adorable! She was so excited to be styled differently.",
    photos: ["p3"],
    tags: ["fresh", "firsts"],
  },
];
