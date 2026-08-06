"use client";

import { useState } from "react";

import {
  SearchIcon,
  SparklesIcon,
} from "@/components/icons";

import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

import { Timeline } from "@/components/planner/Timeline";
import { RetrievedChunks } from "@/components/planner/RetrievedChunks";

import { useStudyPlan } from "@/hooks/useStudyPlan";

export default function PlannerPage() {
  const [topic, setTopic] = useState("");

  const {
    plan,
    isGenerating,
    generate,
  } = useStudyPlan();

  const trimmedTopic = topic.trim();

  const handleGenerate = () => {
    if (!trimmedTopic || isGenerating) return;
    generate(trimmedTopic);
  };

  return (
    <AppShell title="Study Planner">
      <Card hoverLift={false} softBg>
        <div className="planner-hero">
          <div className="planner-search">
            <Input
              icon={<SearchIcon size={16} />}
              placeholder="Enter a topic (e.g. LangChain, Machine Learning)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGenerate();
                }
              }}
              inputSize="lg"
            />
          </div>

          <Button
            size="lg"
            isLoading={isGenerating}
            disabled={!trimmedTopic}
            onClick={handleGenerate}
          >
            <SparklesIcon size={18} />
            Generate Study Plan
          </Button>
        </div>
      </Card>

      <div className="mt-8">
        {isGenerating ? (
          <LoadingScreen
            messages={[
              "Searching your study material...",
              "Generating personalized study plan...",
            ]}
          />
        ) : plan ? (
          <>
            <div className="mb-8">
              <h2 className="plan-heading">
                Your study plan for "{plan.topic}"
              </h2>

              <p className="plan-subheading">
                {plan.days.length} day
                {plan.days.length !== 1 ? "s" : ""} • Built using{" "}
                {(plan.retrievedChunks ?? []).length} retrieved chunks.
              </p>
            </div>

            <Timeline days={plan.days} />

            {(plan.retrievedChunks ?? []).length > 0 && (
              <div className="mt-10">
                <h3 className="section-title">
                  Retrieved Study Material
                </h3>

                <RetrievedChunks
                  chunks={plan.retrievedChunks}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={<SparklesIcon size={28} />}
            title="No study plan generated"
            description="Upload your notes, then enter a topic to generate an AI-powered study plan."
          />
        )}
      </div>
    </AppShell>
  );
}