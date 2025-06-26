import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster.tsx";
import App from "./App.tsx";
import AboutUs from "./components/AboutUs.tsx";
import Contact from "./components/Contact.tsx";
import PrivacyPolicy from "./components/PrivacyPolicy.tsx";
import "./index.css";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import WhatIsMcp from "./components/articles/WhatIsMcp.tsx";
import HowToUseInspector from "./components/articles/HowToUseInspector.tsx";
import DebuggingErrors from "./components/articles/DebuggingErrors.tsx";
import AboutThisSite from "./components/articles/AboutThisSite.tsx";
import MuppetKitSpotlight from "./components/articles/MuppetKitSpotlight.tsx";
import McpInspectorToolsGuide from "./components/articles/McpInspectorToolsGuide.tsx";
import Guides from "./components/Guides.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/oauth/callback",
    element: <App />,
  },
  {
    path: "/oauth/callback/debug",
    element: <App />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/guides",
    element: <Guides />,
  },
  {
    path: "/articles/what-is-mcp",
    element: <WhatIsMcp />,
  },
  {
    path: "/articles/how-to-use-inspector",
    element: <HowToUseInspector />,
  },
  {
    path: "/articles/debugging-errors",
    element: <DebuggingErrors />,
  },
  {
    path: "/articles/about-this-site",
    element: <AboutThisSite />,
  },
  {
    path: "/articles/muppet-kit-spotlight",
    element: <MuppetKitSpotlight />,
  },
  {
    path: "/articles/mcp-inspector-tools-guide",
    element: <McpInspectorToolsGuide />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
    <Toaster />
  </StrictMode>,
);