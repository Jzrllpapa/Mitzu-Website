import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { favoriteThings } from "@/data/favorites";
import type { FavoriteThing } from "@/types/dog";

const groups: { id: FavoriteThing["category"]; label: string }[] = [
  { id: "foods", label: "Foods" },
  { id: "treats", label: "Treats" },
  { id: "toys", label: "Toys" },
  { id: "spot", label: "Sleeping spot" },
  { id: "activities", label: "Activities" },
  { id: "friends", label: "Friends" },
];

export function FavoriteThings() {
  return (
    <section id="favorites" className="bg-(--background) py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Her favorite things"
          title="The good stuff."
          description="A carefully curated, entirely non-negotiable list of preferences."
        />

        <Tabs defaultValue="foods" className="mt-12">
          <TabsList className="flex-wrap justify-start rounded-2xl sm:rounded-full">
            {groups.map((g) => (
              <TabsTrigger key={g.id} value={g.id} className="rounded-lg">
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {groups.map((g) => (
            <TabsContent key={g.id} value={g.id}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteThings
                  .filter((f) => f.category === g.id)
                  .map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                      whileHover={{ y: -4 }}
                    >
                      <Card className="h-full">
                        <CardContent className="flex items-start gap-4 p-6">
                          <span className="text-3xl">{item.emoji}</span>
                          <div>
                            <p className="font-display text-lg font-medium">{item.name}</p>
                            <p className="mt-1 text-sm text-(--muted-foreground)">
                              {item.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
