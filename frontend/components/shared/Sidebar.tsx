"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BrainCircuitIcon,
  LayoutDashboardIcon,
  UploadCloudIcon,
  SparklesIcon,
  FileStackIcon,
  SettingsIcon,
  XIcon,
} from "@/components/icons";

import { NAV_ITEMS } from "@/constants";

const icons = {
  LayoutDashboard: LayoutDashboardIcon,
  UploadCloud: UploadCloudIcon,
  Sparkles: SparklesIcon,
  FileStack: FileStackIcon,
  Settings: SettingsIcon,
};

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const links = NAV_ITEMS.map((item) => {
    const Icon =
      icons[item.icon as keyof typeof icons];

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={
          pathname === item.href
            ? "nav-link nav-link--active"
            : "nav-link"
        }
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </Link>
    );
  });

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <BrainCircuitIcon size={20} />
          <span>Study Companion</span>
        </div>

        <nav>{links}</nav>
      </aside>

      {isOpen && (
        <div className="drawer-overlay">
          <div
            className="drawer-backdrop"
            onClick={onClose}
          />

          <aside className="drawer-panel">
            <div className="drawer-header">
              <div className="sidebar-brand">
                <BrainCircuitIcon size={20} />
                <span>Study Companion</span>
              </div>

              <button
                onClick={onClose}
                className="drawer-close"
              >
                <XIcon size={20} />
              </button>
            </div>

            <nav>{links}</nav>
          </aside>
        </div>
      )}
    </>
  );
}