import Link from "next/link";
import { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { ArrowUpRightIcon } from "@/components/icons";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      aria-label={title}
      className="block"
    >
      <Card className="feature-card">
        <div className="feature-card-top">
          <div className="feature-icon">
            {icon}
          </div>

          <ArrowUpRightIcon size={16} />
        </div>

        <h3 className="feature-title">
          {title}
        </h3>

        <p className="feature-desc">
          {description}
        </p>
      </Card>
    </Link>
  );
}