import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import NotFoundPage from "../pages/NotFoundPage";
import { LoginPage, SignUpPage } from "../features/auth";
import { AppLayout } from "../layouts/AppLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ]
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])