import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b p-4">
        Mini Issue Tracker
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