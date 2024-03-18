import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { routeTree } from "@/routeTree.gen";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },

  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth0();
  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Auth0Provider
        domain="tournamentapp.eu.auth0.com"
        clientId="FsxOm4fzleRo765JkFvqn6iBSC5Grkxk"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <InnerApp />
          </ThemeProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </React.StrictMode>,
  );
}
