"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  BrainCogIcon,
  DatabaseIcon,
  SearchIcon,
  UploadCloudIcon,
} from "@/components/icons";

import { FeatureCard } from "@/components/dashboard/FeatureCard";
import { AppShell } from "@/components/shared/AppShell";
import { Button } from "@/components/ui/Button";

import {
  getDashboard,
  type DashboardResponse,
} from "@/services/api";

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);

        const data = await getDashboard();

        if (mounted) {
          setDashboard(data);
        }
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError("Unable to load dashboard.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppShell title="Dashboard">
      <section className="hero">
        <div className="hero-blob-a" />
        <div className="hero-blob-b" />

        <div className="hero-content">
          <h1 className="hero-title">
            AI Study Companion
          </h1>

          <p className="hero-subtitle">
            Upload your study notes and let AI create personalized study plans.
          </p>

          <Link
            href="/upload"
            className="hero-cta"
            style={{ display: "inline-block" }}
          >
            <Button size="lg" variant="primary-inverse">
              <UploadCloudIcon size={18} />
              Upload Notes
            </Button>
          </Link>
        </div>
      </section>

      

      {error && (
        <p className="text-center py-6 text-red-500">
          {error}
        </p>
      )}

      

      <section className="grid-features">
        <FeatureCard
          icon={<UploadCloudIcon size={20} />}
          title="Upload Documents"
          description="Upload PDF or TXT study materials."
          href="/upload"
        />

        <FeatureCard
          icon={<BrainCogIcon size={20} />}
          title="AI Study Planner"
          description="Generate personalized study plans."
          href="/planner"
        />

        <FeatureCard
          icon={<SearchIcon size={20} />}
          title="Smart Retrieval"
          description="Find the most relevant study notes."
          href="/planner"
        />

        <FeatureCard
          icon={<DatabaseIcon size={20} />}
          title="Vector Database"
          description="Semantic search powered by Qdrant."
          href="/documents"
        />
      </section>
    </AppShell>
  );
}