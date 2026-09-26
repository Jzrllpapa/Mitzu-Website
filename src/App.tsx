import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgressBar } from "@/components/layout/scroll-progress-bar";
import { BackToTop } from "@/components/layout/back-to-top";
import { PawTrail } from "@/components/shared/paw-trail";
import { AnimatedCursor } from "@/components/shared/animated-cursor";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { queryClient } from "@/lib/query-client";
import { useTheme } from "@/hooks/use-theme";

function AppShell() {
  useTheme(); // applies persisted/system theme class to <html> on mount
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <AnimatedCursor />
      <ScrollProgressBar />
      <PawTrail />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BackToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--popover)",
            color: "var(--popover-foreground)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={150}>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
