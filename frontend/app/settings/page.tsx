"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import {
  getProfile,
  updateProfile,
  getStatus,
} from "@/services/api";

import type { ServiceStatus } from "@/types";

import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [statuses, setStatuses] = useState<ServiceStatus[]>([]);
  const [theme, setTheme] = useState<"pink" | "midnight">("pink");

  useEffect(() => {
    async function loadData() {
      const [profile, status] = await Promise.all([
        getProfile(),
        getStatus(),
      ]);

      setProfile(profile);
      setStatuses(status);
    }

    loadData();
  }, []);

  return (
    <AppShell title="Settings">
      <div className="grid-docs">
        <Card hoverLift={false}>
          <h3 className="section-title">Profile</h3>

          <div className="field-stack">
            <Input
              label="Full name"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
            />

            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
            />

            <Button
              size="sm"
              onClick={() => updateProfile(profile)}
            >
              Save Changes
            </Button>
          </div>
        </Card>

        <Card hoverLift={false}>
          <h3 className="section-title">Theme</h3>

          <div className="theme-options">
            {(["pink", "midnight"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  "theme-option",
                  theme === t && "theme-option--active"
                )}
              >
                <div
                  className={cn(
                    "theme-swatch",
                    `theme-swatch--${t}`
                  )}
                />

                <span>{t}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card hoverLift={false}>
        <h3 className="section-title">
          System Status
        </h3>

        {statuses.map((status) => (
          <div
            key={status.name}
            className="status-row"
          >
            <span>{status.name}</span>
            <span>{status.latencyMs} ms</span>
            <span>{status.status}</span>
          </div>
        ))}
      </Card>
    </AppShell>
  );
}