import { useAuth0 } from "@auth0/auth0-react";
import { Router, RouterProvider } from "@tanstack/react-router";

export function InnerApp({ router }: { router: Router }) {
  const auth = useAuth0();
  return <RouterProvider router={router} context={{ auth }} />;
}
