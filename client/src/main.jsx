import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import { ClerkProvider } from "@clerk/clerk-react";
import { frFR } from "@clerk/localizations";
import CompoCreator from "./pages/CompoCreator";
import Admin from "./pages/Admin";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/auth/register",
    element: <Register />
  },
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "/coach/composition",
    element: <CompoCreator />
  },
  {
    path: "/admin/overview",
    element: <Admin />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ClerkProvider publishableKey={publishableKey} localization={frFR}>
        <RouterProvider router={router} />
      </ClerkProvider>
  </React.StrictMode>
);











