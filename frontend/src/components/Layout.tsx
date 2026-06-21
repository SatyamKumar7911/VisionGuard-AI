import type { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
  connectionState: "OFFLINE" | "RECONNECTING" | "LIVE";
}

export default function Layout({ children, connectionState }: LayoutProps) {
  const stateStyles = {
    "LIVE": "bg-success/10 text-success border-success/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]",
    "RECONNECTING": "bg-warning/10 text-warning border-warning/30 shadow-[0_0_10px_rgba(234,179,8,0.3)]",
    "OFFLINE": "bg-destructive/10 text-destructive border-destructive/30"
  };

  const dotStyles = {
    "LIVE": "bg-success animate-pulse",
    "RECONNECTING": "bg-warning animate-pulse",
    "OFFLINE": "bg-destructive"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] dark:text-white dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              VisionGuard <span className="text-primary neon-text">AI</span>
            </h1>
            <span className="text-muted-foreground text-sm font-medium ml-2 hidden sm:inline-block">
              Smart Enforcement Suite
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${stateStyles[connectionState]}`}>
              <div className={`w-2 h-2 rounded-full ${dotStyles[connectionState]}`} />
              {connectionState}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        {children}
      </main>

      <footer className="mt-auto border-t border-slate-800 py-4 text-center text-sm text-slate-400 backdrop-blur-md">
        <p>
          Designed & Developed by
          <span className="font-semibold text-primary hover:text-primary/80 transition cursor-pointer ml-1">
            Satyam Kumar
          </span>
        </p>
        <p className="mt-1">
          © 2026 All rights reserved.
        </p>
      </footer>
    </div>
  );
}
