export const ProjectListSkeleton = () => {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Loading projects"
    >
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-slate-200" />

            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-3 w-24 rounded bg-slate-100" />
            </div>
          </div>

          <div className="h-4 w-3/4 rounded bg-slate-100" />

          <div className="border-t border-slate-100 pt-4">
            <div className="h-8 w-1/2 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  )
}