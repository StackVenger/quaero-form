import type { LucideIcon } from "lucide-react";

type iconType = "Type" | "ChevronDown";

export interface FormSelectItem {
  value: string;
  icon: iconType;
  text: string;
}

export type IconMapType = Record<iconType, LucideIcon>;
