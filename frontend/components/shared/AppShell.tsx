"use client";

import { useState, type ReactNode } from "react";

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  title: string;
  children: ReactNode;
}

export function AppShell({
  title,
  children,
}: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      <div className="app-blobs">
        <div className="app-blob app-blob--one" />
        <div className="app-blob app-blob--two" />
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="app-content">
        <Navbar
          title={title}
          onMenuClick={openSidebar}
        />

        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
}