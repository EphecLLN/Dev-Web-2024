import { SiteHeader } from "@/components/site-header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
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

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <SiteHeader />
        <Outlet />
      </header>
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
        <ReactQueryDevtoolsProduction />
      </Suspense>
    </>
  ),
});
