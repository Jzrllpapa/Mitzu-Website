import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CheckCircle2, Clock, Pill, Stethoscope, Syringe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/shared/section-heading";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { weightHistory, vaccinations, vetVisits, medications } from "@/data/health";
import { formatDate, formatShortDate } from "@/utils/date";
import { cn } from "@/lib/utils";

const statusMeta = {
  "up-to-date": {
    label: "Up to date",
    className: "text-forest-700 dark:text-forest-400",
    icon: CheckCircle2,
  },
  "due-soon": { label: "Due soon", className: "text-clay-600 dark:text-clay-400", icon: Clock },
  overdue: { label: "Overdue", className: "text-red-600 dark:text-red-400", icon: Clock },
} as const;

export function Health() {
  const ref = useScrollReveal<HTMLDivElement>({ selector: ".health-card", stagger: 0.08 });
  const latestWeight = weightHistory[weightHistory.length - 1].weightKg;
  const firstWeight = weightHistory[0].weightKg;

  return (
    <section id="health" className="bg-(--secondary)/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Keeping her healthy"
          title="Health dashboard."
          description="Weight, vaccinations, vet visits, and medication — all in one place."
        />

        <div ref={ref} className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Weight chart */}
          <Card className="health-card lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Weight history</CardTitle>
                <p className="mt-1 text-sm text-(--muted-foreground)">
                  From {firstWeight} kg to {latestWeight} kg
                </p>
              </div>
              <Badge variant="secondary">{latestWeight} kg today</Badge>
            </CardHeader>
            <CardContent className="h-64 pl-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weightHistory}
                  margin={{ top: 10, right: 16, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-forest-600)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-forest-600)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 8" vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(d) => formatShortDate(d)}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} kg`, "Weight"]}
                    labelFormatter={(d) => formatDate(d as string)}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--popover)",
                      fontSize: 13,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="weightKg"
                    stroke="var(--color-forest-600)"
                    strokeWidth={2.5}
                    fill="url(#weightFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vaccinations */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Syringe className="size-4 text-clay-500" />
                Vaccinations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vaccinations.map((v) => {
                const meta = statusMeta[v.status];
                return (
                  <div key={v.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="text-xs text-(--muted-foreground)">
                        Next due {formatShortDate(v.nextDue)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "flex shrink-0 items-center gap-1 text-xs font-medium",
                        meta.className
                      )}
                    >
                      <meta.icon className="size-3.5" />
                      {meta.label}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Vet visits */}
          <Card className="health-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="size-4 text-clay-500" />
                Vet visits & medical history
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {vetVisits.map((visit, i) => (
                  <div key={visit.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium">{visit.reason}</p>
                      <p className="font-mono text-xs text-(--muted-foreground)">
                        {formatDate(visit.date)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-(--muted-foreground)">{visit.notes}</p>
                    <p className="mt-1 text-xs text-(--muted-foreground)">{visit.vet}</p>
                    {i < vetVisits.length - 1 && <Separator className="mt-5" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="size-4 text-clay-500" />
                Medication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{med.name}</p>
                    <p className="text-xs text-(--muted-foreground)">
                      {med.dosage} · {med.frequency}
                    </p>
                  </div>
                  <Badge variant={med.active ? "secondary" : "outline"} className="shrink-0">
                    {med.active ? "Active" : "Completed"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
