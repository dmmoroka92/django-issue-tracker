import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <Outlet />
      </div>
    </main>
  );
}