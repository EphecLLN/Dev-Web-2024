import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AuthState } from "@auth0/auth0-react/dist/auth-state";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

const ReactQueryDevtoolsProduction = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/react-query-devtools").then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthState;
}>()({
  component: () => (
    <>
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <Outlet />
        <SiteFooter />
      </div>
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
        <ReactQueryDevtoolsProduction />
      </Suspense>
    </>
  ),
});
