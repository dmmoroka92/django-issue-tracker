import { NavLink, Outlet } from "react-router"
import {
  Layers,
  LayoutDashboard,
  FolderKanban,
  LogOut,
  LoaderCircle,
} from "lucide-react"

import { useCurrentUser } from "../features/auth/hooks/useCurrentUser"
import { useLogout } from "../features/auth/hooks/useLogout"
import { APP_ROUTES } from "../app/routes"
import { cn } from "../shared/lib/utils"

const navigationItems = [
  {
    label: "Dashboard",
    to: APP_ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Projects",
    to: APP_ROUTES.PROJECTS,
    icon: FolderKanban,
    end: false,
  },
]

export function AppLayout() {
  const { data: currentUser } = useCurrentUser()
  const { mutate: logout, isPending } = useLogout()

  const initials = currentUser
    ? `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`.toUpperCase()
    : ""

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-0 flex h-screen w-64 shrink-0 flex-col",
          "border-r border-slate-200 bg-white"
        )}
      >
        {/* Branding */}
        <div className="flex h-20 items-center gap-3 px-6">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center",
              "rounded-xl bg-blue-600 text-white shadow-sm"
            )}
          >
            <Layers size={22} />
          </div>

          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              Issue Tracker
            </h1>

            <p className="text-xs text-slate-500">
              Workspace
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-1 px-4 py-6"
        >
          <p
            className={cn(
              "mb-3 px-3 text-xs font-semibold",
              "uppercase tracking-wider text-slate-400"
            )}
          >
            Workspace
          </p>

          {navigationItems.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5",
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )
              }
            >
              <Icon size={19} strokeWidth={1.8} />

              {label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-slate-200 px-6 py-5">
          <p className="text-xs font-medium text-slate-500">
            Mini Issue Tracker
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Version 1.0
          </p>
        </div>
      </aside>

      {/* Workspace */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header
          className={cn(
            "sticky top-0 z-20 flex h-20 items-center",
            "justify-between border-b border-slate-200",
            "bg-white px-6 lg:px-8"
          )}
        >
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Workspace
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Manage your projects and issues
            </p>
          </div>

          <div className="flex items-center gap-5">
            {/* Current user */}
            {currentUser && (
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center",
                    "rounded-full bg-blue-100",
                    "text-sm font-semibold text-blue-700"
                  )}
                >
                  {initials}
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800">
                    {currentUser.fullName}
                  </p>

                  <p className="text-xs text-slate-500">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            )}

            <div className="h-8 w-px bg-slate-200" />

            {/* Logout */}
            <button
              type="button"
              disabled={isPending}
              onClick={() => logout()}
              className={cn(
                "flex items-center justify-center gap-2",
                "rounded-lg border border-slate-200 px-3 py-2",
                "text-sm font-medium text-slate-600",
                "transition-colors hover:border-red-200",
                "hover:bg-red-50 hover:text-red-600",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {isPending ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <LogOut size={17} />
              )}

              {isPending ? "Signing out..." : "Logout"}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}