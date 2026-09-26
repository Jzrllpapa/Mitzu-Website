import { useQuery } from "@tanstack/react-query";
import { dogFacts } from "@/data/facts";

async function fetchRandomFact() {
  // simulates a network request so TanStack Query has something real to manage
  await new Promise((r) => setTimeout(r, 400));
  return dogFacts[Math.floor(Math.random() * dogFacts.length)];
}

export function useRandomDogFact(refreshKey: number) {
  return useQuery({
    queryKey: ["dog-fact", refreshKey],
    queryFn: fetchRandomFact,
    staleTime: Infinity,
  });
}
