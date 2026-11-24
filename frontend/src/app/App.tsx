import { RouterProvider } from "react-router";
import { router } from "./router";

import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function App() {
  return  (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />
    </QueryClientProvider>
  )
}