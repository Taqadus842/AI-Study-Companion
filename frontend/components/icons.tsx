import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(props: IconProps) {
  const { size = 20, ...rest } = props;
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
}

export function UploadCloudIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.3 8.03 4 4 0 0 1 17 16h-1" />
      <path d="M12 12v8" />
      <path d="m9 15 3-3 3 3" />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </svg>
  );
}

export function LayoutDashboardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

export function FileStackIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3h9l4 4v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M9 20v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

export function BrainCogIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function ListChecksIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m3 6 2 2 3-3" />
      <path d="m3 14 2 2 3-3" />
      <path d="M11 6h10M11 14h10M11 20h10" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function FileTextIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" />
      <path d="M9 13h6M9 17h6M9 9h2" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function LoaderIcon(props: IconProps) {
  return (
    <svg {...base(props)} className={cnMerge("icon-spin", props.className)}>
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

export function BookOpenIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 5c3 0 6 1 9 3 3-2 6-3 9-3v13c-3 0-6 1-9 3-3-2-6-3-9-3V5Z" />
      <path d="M12 8v13" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

export function AlertCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}

export function XCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9.5 9.5 5 5M14.5 9.5l-5 5" />
    </svg>
  );
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function BrainCircuitIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 1 5v1a3 3 0 0 0 5 2 3 3 0 0 0 5-2v-1a3 3 0 0 0 1-5 3 3 0 0 0-3-3V6a3 3 0 0 0-3-3Z" />
      <path d="M9 10h6M9 14h6" />
    </svg>
  );
}

function cnMerge(...vals: (string | undefined)[]) {
  return vals.filter(Boolean).join(" ");
}
