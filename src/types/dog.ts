export type PhotoCategory = "puppy" | "adventures" | "goofy" | "naps" | "friends";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
  caption?: string;
  /** relative aspect ratio height/width, used for masonry sizing before load */
  ratio: number;
}

export interface Memory {
  id: string;
  date: string; // ISO
  title: string;
  story: string;
  photos: string[]; // Photo ids
  tags: string[];
}

export type MilestoneKind = "birth" | "milestone" | "vet" | "trip" | "moment";

export interface Milestone {
  id: string;
  date: string;
  kind: MilestoneKind;
  title: string;
  description: string;
}

export interface FavoriteThing {
  id: string;
  category: "foods" | "treats" | "toys" | "spot" | "activities" | "friends";
  name: string;
  description: string;
  emoji: string;
}

export interface WeightEntry {
  date: string;
  weightKg: number;
}

export interface Vaccination {
  id: string;
  name: string;
  dateGiven: string;
  nextDue: string;
  status: "up-to-date" | "due-soon" | "overdue";
}

export interface VetVisit {
  id: string;
  date: string;
  reason: string;
  vet: string;
  notes: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  active: boolean;
}

export interface DogFact {
  id: string;
  fact: string;
}

export interface DogProfile {
  name: string;
  breed: string;
  birthday: string;
  weightKg: number;
  favoriteFood: string;
  favoriteToy: string;
  personality: string[];
  quote: string;
  heroPhoto: string;
  hoverPhoto: string[];
}

export interface Place {
  id: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  visitedOn?: string;
  description?: string;
}