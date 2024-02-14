import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import ReactDOM from "react-dom/client";
import Root from "./routes/root.tsx";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
