import { SiteFooter } from "@/components/site-footer";
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
