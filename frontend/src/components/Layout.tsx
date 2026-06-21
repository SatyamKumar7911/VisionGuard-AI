import type { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
  isConnected: boolean;
}

export default function Layout({ children, isConnected }: LayoutProps) {
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
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${isConnected ? 'bg-success/10 text-success border border-success/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-destructive/10 text-destructive border border-destructive/30'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
              {isConnected ? "LIVE" : "OFFLINE"}
            </div>
            {!isConnected && <span className="text-xs text-muted-foreground animate-pulse">Reconnecting...</span>}
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
