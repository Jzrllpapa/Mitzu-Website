import { Cake, Dog, Heart, PawPrint, Sparkles, Weight, Bone, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { dogProfile } from "@/data/profile";
import { ageFromBirthday, formatDate } from "@/utils/date";
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";

const facts = [
  { icon: Dog, label: "Name", value: dogProfile.name },
  { icon: PawPrint, label: "Breed", value: dogProfile.breed },
  { icon: Cake, label: "Birthday", value: formatDate(dogProfile.birthday) },
  { icon: Sparkles, label: "Age", value: ageFromBirthday(dogProfile.birthday) },
  { icon: Weight, label: "Weight", value: `${dogProfile.weightKg} kg` },
  { icon: Bone, label: "Favorite food", value: dogProfile.favoriteFood },
  { icon: Heart, label: "Favorite toy", value: dogProfile.favoriteToy },
];

export function About() {
  return (
    <section id="about" className="bg-(--background) py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The essentials"
          title="Everything you'd want to know."
          description="A quick profile for anyone meeting her for the first time — or the hundredth."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {facts.map((fact) => (
            <motion.div key={fact.label} variants={fadeUp}>
              <Card className="group transition-transform duration-300 hover:-translate-y-1">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-700/8 text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-cream-50 dark:bg-cream-100/10 dark:text-cream-100 dark:group-hover:bg-cream-100 dark:group-hover:text-forest-900">
                    <fact.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-(--muted-foreground)">{fact.label}</p>
                    <p className="mt-0.5 font-display text-lg font-medium leading-snug">
                      {fact.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            className="sm:col-span-2 lg:col-span-1 lg:row-span-1"
          >
            <Card className="h-full">
              <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-clay-500/12 text-clay-600 dark:text-clay-400">
                    <HeartHandshake className="size-5" />
                  </div>
                  <p className="text-sm text-(--muted-foreground)">Personality</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dogProfile.personality.map((trait) => (
                    <Badge key={trait} variant="secondary">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}