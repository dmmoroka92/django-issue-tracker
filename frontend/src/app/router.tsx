import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import NotFoundPage from "../pages/NotFoundPage";
import { LoginPage, SignUpPage } from "../features/auth";
import { AppLayout } from "../layouts/AppLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { ProjectsPage } from "../features/projects/pages/ProjectsPage";
import { ProjectDetailsPage } from "../features/projects/pages/ProjectDetailsPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ]
  },
  {

    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/projects",
            element: <ProjectsPage />
          },
          {
            path: "projects/:id",
            element: <ProjectDetailsPage />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])