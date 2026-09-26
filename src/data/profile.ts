import type { DogProfile } from "@/types/dog";
import heroPhoto from "@/assets/images/mitzu-christmas.jpg";
import hoverPhoto from "@/assets/images/mitzu-in-quezon-2.jpg";
import hoverPhoto2 from "@/assets/images/mitzu-with-mom-wowa.jpg";
import hoverPhoto3 from "@/assets/images/mitzu-urang.jpg";
import hoverPhoto4 from "@/assets/images/mitzu-bb.jpg";

export const dogProfile: DogProfile = {
  name: "Mitzu",
  breed: "Shih Tzu",
  birthday: "2023-10-02",
  weightKg: 7.1,
  favoriteFood: "Boiled Chicken Meat/Liver and Quail Egg",
  favoriteToy: "Moo: The Cow from Enchanted Kingdom",
  personality: ["Goofy", "Loyal", "Poop enthusiast"],
  quote: "I can do sit, give paw, and come on command, but if only you have treats",
  heroPhoto,
  hoverPhoto: [hoverPhoto, hoverPhoto2, hoverPhoto3, hoverPhoto4],
};
