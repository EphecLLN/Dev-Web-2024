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
import ErrorPage from "./pages/ErrorPage.tsx";
import UserIndex from "./pages/UserIndex.tsx";

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
  errorComponent: ErrorPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(usersQueryOptions),
  component: Users,
});

export const userIndexRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: "/",
  component: UserIndex,
});

export const userRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: "$userId",
  errorComponent: ErrorPage,
  loader: ({ context: { queryClient }, params: { userId } }) =>
    queryClient.ensureQueryData(userQueryOptions(userId)),
  component: User,
});

const routeTree = rootRoute.addChildren([
  usersRoute.addChildren([userRoute, userIndexRoute]),
  indexRoute,
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
