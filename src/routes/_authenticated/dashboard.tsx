import { createFileRoute } from "@tanstack/react-router";
import { Users, Boxes, UserCheck, Building2 } from "lucide-react";
import { useDivisions, useMyProfile, useProfiles } from "@/hooks/useProfile";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — OrgTool" },
      { name: "description", content: "Ringkasan anggota dan divisi organisasi kampus." },
      { property: "og:title", content: "Dashboard — OrgTool" },
      { property: "og:description", content: "Ringkasan anggota dan divisi organisasi kampus." },
    ],
  }),
  component: DashboardPage,
});

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

function DashboardPage() {
  const { data: profile } = useMyProfile();
  const { data: profiles = [], isLoading } = useProfiles();
  const { data: divisions = [] } = useDivisions();

  const totalAnggota = profiles.length;
  const anggotaAktif = profiles.filter((p) => p.status === "Active").length;
  const myDivision = divisions.find((d) => d.code === profile?.division);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Halo, {profile?.nickname || profile?.full_name || "Anggota"}!
        </h1>
        <p className="mt-2 text-sm text-primary-foreground/80">
          Selamat datang kembali di OrgTool. Berikut ringkasan organisasi hari ini.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Anggota" value={isLoading ? "…" : totalAnggota} icon={Users} />
        <StatCard label="Total Divisi" value={divisions.length || "…"} icon={Boxes} />
        <StatCard label="Anggota Aktif" value={isLoading ? "…" : anggotaAktif} icon={UserCheck} />
        <StatCard
          label="Divisi Saya"
          value={myDivision?.code ?? "-"}
          icon={Building2}
        />
      </section>

      {myDivision && (
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Divisi {myDivision.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {myDivision.description ?? "Belum ada deskripsi divisi."}
          </p>
        </section>
      )}
    </div>
  );
}
