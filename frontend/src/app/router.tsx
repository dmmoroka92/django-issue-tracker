import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import NotFoundPage from "../pages/NotFoundPage";
import { LoginPage, SignUpPage } from "../features/auth";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])