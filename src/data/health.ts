import type { WeightEntry, Vaccination, VetVisit, Medication } from "@/types/dog";

export const weightHistory: WeightEntry[] = [
  { date: "2025-03-02", weightKg: 5.4 },
  { date: "2025-09-13", weightKg: 5.7 },
  { date: "2026-01-12", weightKg: 6.2 },
  { date: "2026-02-02", weightKg: 6.6 },
  { date: "2026-03-16", weightKg: 6.1 },
  { date: "2026-03-30", weightKg: 6.8 },
  { date: "2026-04-15", weightKg: 6.8 },
  { date: "2026-07-16", weightKg: 6.8 },
  { date: "2026-08-12", weightKg: 7.1 },
  { date: "2026-09-12", weightKg: 7.1 },
];

export const vaccinations: Vaccination[] = [
  {
    id: "v1",
    name: "Rabisin (Rabies)",
    dateGiven: "2026-03-30",
    nextDue: "2027-03-30",
    status: "up-to-date",
  },
  {
    id: "v2",
    name: "Recombitek (Distemper, Adenovirus, Parvovirus, Parainfluenza)",
    dateGiven: "2026-09-02",
    nextDue: "2027-03-02",
    status: "up-to-date",
  },
  {
    id: "v3",
    name: "Bravecto",
    dateGiven: "2026-09-12",
    nextDue: "2026-12-12",
    status: "up-to-date",
  },
  {
    id: "v4",
    name: "Prazyl (Deworming)",
    dateGiven: "2026-07-16",
    nextDue: "2026-10-16",
    status: "due-soon",
  },
];

export const vetVisits: VetVisit[] = [
  {
    id: "vv1",
    date: "2026-03-30",
    reason: "Anti Rabies vaccination booster",
    vet: "Dr. Jugueta, Vet Refurblic Animal Clinic",
    notes: "Excellent health. Weight stable. No adverse reactions observed after vaccination.",
  },
  {
    id: "vv2",
    date: "2026-02-02",
    reason: "Deworming",
    vet: "Dr. Jugueta, Vet Refurblic Animal Clinic",
    notes: "No adverse reactions observed. Deworming medication administered successfully.",
  },
  {
    id: "vv3",
    date: "2025-09-13",
    reason: "Booster shot",
    vet: "Dr. Oliva, Pets Avenue Animal Wellness Center",
    notes: "Vaxilaner booster administered, no adverse reaction.",
  },
  {
    id: "vv4",
    date: "2025-03-02",
    reason: "Anti tick and flea treatment and deworming",
    vet: "Dr. Oliva, Pets Avenue Animal Wellness Center",
    notes:
      "Took Vaxilaner for anti tick and flea treatment and deworming. No side effects observed.",
  },
];

export const medications: Medication[] = [
  {
    id: "md1",
    name: "No medications currently prescribed",
    dosage: "N/A",
    frequency: "N/A",
    active: true,
  },
];
