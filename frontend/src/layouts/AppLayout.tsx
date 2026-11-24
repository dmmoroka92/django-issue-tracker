import { Outlet } from "react-router";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import { useLogout } from "../features/auth/hooks/useLogout";

export function AppLayout() {
  const { data: currentUser } = useCurrentUser();
  const { mutate: logout, isPending } = useLogout();
   
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-lg font-semibold">
          Mini Issue Tracker
        </h1>

        <div className="flex items-center gap-4">
          {currentUser && (
            <div className="text-right">
              <p className="text-sm font-medium">
                {currentUser.fullName}
              </p>

              <p className="text-xs text-slate-500">
                {currentUser.email}
              </p>
            </div>
          )}

          <button
            type="button"
            disabled={isPending}
            onClick={() => logout()}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-50"
          >
            {isPending ? "Signing out..." : "Logout"}
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r p-4">
          Projects
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}