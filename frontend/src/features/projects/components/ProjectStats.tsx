type ProjectStatsProps = {
  total: number
  activeCount: number
  archivedCount: number 
}

export const ProjectStats = ({
  total,
  activeCount,
  archivedCount
}: ProjectStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[
        {
          label: "Total projects",
          value: total,
          color: "text-slate-900",
        },
        {
          label: "Active projects",
          value: activeCount,
          color: "text-emerald-600",
        },
        {
          label: "Archived projects",
          value: archivedCount,
          color: "text-slate-500",
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-200 bg-white p-5"
        >
          <p className="text-sm text-slate-500">
            {stat.label}
          </p>

          <p className={`mt-2 text-3xl font-semibold ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
