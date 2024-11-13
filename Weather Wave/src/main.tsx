// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Forecast from "./pages/Forecast.tsx";
import CelestialEvent from "./pages/CelestialEvent.tsx";
import About from "./pages/About.tsx";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/forecast",
          element: <Forecast />,
        },
        {
          path: "/celestial-event",
          element: <CelestialEvent />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ],
  // {
  //   basename: "/weather-wave",
  // }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
