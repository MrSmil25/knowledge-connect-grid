import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Objective } from "@/lib/command-center";

export function Momentum({ objectives }: { objectives: Objective[] }) {
  const data = objectives.map((o) => ({
    name: o.title.length > 18 ? `${o.title.slice(0, 18)}…` : o.title,
    progress: Number(o.progress_percent ?? 0),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Momentum</CardTitle>
        <CardDescription>
          Data historis akan terkumpul seiring waktu — untuk saat ini ditampilkan snapshot progress
          Objective periode terpilih.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada Objective pada periode ini.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-25}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 11 }}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "Progress"]} />
              <Bar dataKey="progress" radius={[4, 4, 0, 0]} fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
