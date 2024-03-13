import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./Root.tsx";
import Index from "./pages/Index.tsx";
import Users from "./pages/Users.tsx";
import User from "./pages/User.tsx";
import { userQueryOptions, usersQueryOptions } from "./fetchUsers.ts";
import Error from "./pages/Error.tsx";

const queryClient = new QueryClient();

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Root,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  errorComponent: Error,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(usersQueryOptions),
  component: Users,
});

export const userRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: "$userId",
  errorComponent: Error,
  loader: ({ context: { queryClient }, params: { userId } }) =>
    queryClient.ensureQueryData(userQueryOptions(userId)),
  component: User,
});

const routeTree = rootRoute.addChildren([
  usersRoute.addChildren([userRoute]),
  indexRoute,
]);
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
